<script lang="ts">
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import Textfield from "@smui/textfield";
    import Button, {Label} from "@smui/button"
    import {onMount} from "svelte";
    import type {Credentials} from "@/types/Credentials";

    export let setCredentials: (credentials: Credentials) => void;


    let token: string = sessionStorage.getItem("token") ?? "";
    let url: string = sessionStorage.getItem("url") ?? "";

    const onClickHandler = () => {
        sessionStorage.setItem("url", url);
        sessionStorage.setItem("token", token);
        setCredentials({url, token});
    }

    let ref: HTMLElement = null;
    onMount(() => {
        ref?.focus()
    })
</script>


<div class='container'>
    <div class="login-card">
        <LayoutGrid align="center">
            <Cell span={6}>
                <div class="image-container">
                    <img src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png"
                         alt="gitlab-logo">
                </div>
            </Cell>
            <Cell span={6}>
                <div class="inputcell">
                    <Textfield bind:this={ref} bind:value={url} label="Gitlab url">
                    </Textfield>
                    <Textfield bind:value={token} label="Access token">
                    </Textfield>
                    <div class="button-aligner">
                        <Button on:click={onClickHandler}>
                            <Label>
                                start
                            </Label>
                        </Button>
                    </div>
                </div>
            </Cell>
        </LayoutGrid>
    </div>
</div>


<style>


    .container {
        width: 100%;
        height: calc(95vh - 56px);
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .login-card {
        margin-top: 80px;
        width: 70%;
        height: 60vh;
        border-radius: 10px;
        border: solid 5px #fc6d27;
    }

    .image-container {
        width: 100%;
        height: 50vh;
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .inputcell {
        margin-top: 15%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 80%;
        height: 60%;
    }


</style>