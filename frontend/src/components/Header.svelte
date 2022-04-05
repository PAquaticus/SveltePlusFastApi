<script lang="ts">
    import logo from '@/assets/svelte.png'
    import Button from "@smui/button";
    import type {Credentials} from "@/types/Credentials";
    export let setCredentials: (credentials: Credentials) => void;


    const logout = () => {
        sessionStorage.removeItem("url");
        sessionStorage.removeItem("token");
        setCredentials({url: "", token: ""})
    }


</script>

<header class="global-header">
    <div class="app-name">
        <img src={logo} alt="Svelte Logo" class="logo"/>
        <div>Gitlab deployment helper</div>
    </div>
    <div class="logout-button">
        <Button on:click={logout}>Logout</Button>
    </div>
</header>

<style lang="scss">
  .global-header {
    display: flex;
    justify-content: space-between;
    background-color: #313131;
    height: 56px;
    color: white;
    padding: 15px;
    box-sizing: border-box;

    .logout-button {
      display: flex;
      align-items: center;
      height: 100%;
      padding-right: 5px;

    }

    .app-name {
      display: flex;
      align-items: center;
      height: 100%;

      .logo {
        height: 100%;
        margin-right: 5px;
      }
    }
  }
</style>

