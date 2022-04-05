<script lang="ts">
    import IconButton, {Icon} from '@smui/icon-button';
    import DataTable, {Body, Cell, Head, Row} from '@smui/data-table';
    import {getAllProjects} from "@/gitlabApi";
    import {onMount} from "svelte";
    import Textfield from "@smui/textfield";
    import Button from "@smui/button";
    import type {Credentials} from "@/types/Credentials";
    import {localStorageState} from "@/libs/localStorageState";

    let [favoriteProjects, setFavoriteProjects] = localStorageState("favoriteProjects")
    let favoriteProjectIds: number[] = (favoriteProjects || "").split(",").map(Number).filter(id => !Number.isNaN(id))
    console.log(favoriteProjects)

    let favoriteProjectBooleans: boolean[] = [];
    $: favoriteProjectBooleans = projects.map(project => favoriteProjectIds.includes(project.id));

    const setFavoriteProject = (id: number) => {
        if (favoriteProjectIds.includes(id)) {
            const newFavoriteProjectIds = favoriteProjectIds.filter(projectId => projectId !== id)
            favoriteProjectIds = newFavoriteProjectIds;
            setFavoriteProjects(newFavoriteProjectIds.join(","))
        } else {
            const newProjectIds = favoriteProjectIds.concat(id)
            favoriteProjectIds = newProjectIds;
            setFavoriteProjects(newProjectIds.join(","))
        }
    }


    export let credentials: Credentials;
    let projects: unknown[] = [];

    onMount(() => {
        getAllProjects(credentials.url).then((result: unknown[]) => {
            projects = sortByFavorite(result)
            console.log(sortByFavorite(result))
        })
    })

    let abc: string = ""

    $: sortByFavorite = (projects: unknown[]) => projects.sort((a, b) => {
            if (favoriteProjectIds.includes(a.id) && !favoriteProjectIds.includes(b.id)) {
                return -1
            } else if (!favoriteProjectIds.includes(a.id) && favoriteProjectIds.includes(b.id)) {
                return 1
            } else {
                return a.id - b.id
            }
        })


</script>


<div class="frame">
    <DataTable
            style="width: 100%">
        <Head>
            <Row>
                <Cell/>
                <Cell>Project</Cell>
                <Cell>Current DEV Tag</Cell>
                <Cell>New Tag</Cell>
                <Cell/>
            </Row>
        </Head>
        <Body>

        {#each projects as project, idx}
            <Row>
                <Cell columnId="favorite">
                    <IconButton on:click={() => setFavoriteProject(project.id)} toggle
                                bind:pressed={favoriteProjectBooleans[idx]}>
                        <Icon class="material-icons" on>star</Icon>
                        <Icon class="material-icons">star_border</Icon>
                    </IconButton>
                </Cell>
                <Cell>{project.name}</Cell>
                <Cell>{project.tag_list.length > 0 ? project.tag_list[0] : "" }</Cell>
                <Cell>
                    <Textfield bind:value={abc}/>
                </Cell>
                <Cell>
                    <Button>push</Button>
                </Cell>
            </Row>
        {/each}
        </Body>
    </DataTable>
</div>

<style>

    .frame {
        margin-top: 10px;
        width: 100%;
        height: calc(95vh - 56px);
        display: flex;
        justify-content: center;
        align-content: center;
    }


</style>