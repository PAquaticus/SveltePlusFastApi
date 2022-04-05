

<script lang="ts">
    import Login from "@/pages/Login.svelte";
    import Header from "@/components/Header.svelte";
    import ProjectsTable from "@/components/ProjectsTable.svelte";
    import type {Credentials} from "@/types/Credentials";


    let credentials: Credentials = {
        token: sessionStorage.getItem("token") ?? "",
        url: sessionStorage.getItem("url") ?? ""
    }

    $: isLoggedIn = credentials.token !== "" && credentials.url !== "";


    const setCredentials = (newCredentials: Credentials) => {
        credentials = newCredentials;
    }

</script>


<main>
    <Header setCredentials={setCredentials}/>
    {#if !isLoggedIn}
        <Login setCredentials={setCredentials}/>
    {/if}
    {#if isLoggedIn}
        <ProjectsTable credentials={credentials}/>
    {/if}
</main>