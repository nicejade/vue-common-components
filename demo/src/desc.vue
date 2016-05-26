<template lang="jade">
    h1.welcome {{ welcome }}
    a(class="desc-a" href="https://nicejade.gitbooks.io/vue-components-doc/content/index.html") {{ vueDoc }}
</template>

<script type="text/javascript">
export default {
    data () {
        return {
            welcome: "Welcome To Vue Component Desc And Example",
            vueDoc: "Vue Component Doc"
        }
    }
}
</script>

<style media="screen">
.welcome{
    text-align: center;
    color: #000;
    text-shadow: 0 1px 1px #fff;
}
.desc-a{
    margin: 2% 2% 2% 0;
    padding: 1% 3%;
    position: absolute;
    right: 10%;
    color: #24B3D3;
    font-size: 1em;
    line-height: 1.2;
    background-color: #222222;
    border-radius: 1em;
    text-decoration: none;
}
</style>
