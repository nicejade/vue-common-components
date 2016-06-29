<template lang="jade">
    h1.welcome {{ welcome }}
    a(class="desc-a" href="https://nicejade.gitbooks.io/vue-components-doc/content/index.html") {{ vueDoc }}
    div.desc-img
        img(src='http://7xoosr.com1.z0.glb.clouddn.com/vue-common-components.jpg')
</template>

<script type="text/javascript">
export default {
    data () {
        return {
            welcome: "Welcome To Vue Component Desc And Example",
            vueDoc: "Vue Common Components Doc(gitbooks)"
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
    color: #f2f2f2;
    font-size: 1em;
    line-height: 1.2;
    background-color: #009ad6;
    border-radius: 1em;
    text-decoration: none;
}
.desc-img{
    width: 100%;
    height: 100%;
}
.desc-img>img{
    width: 100%;
}
</style>
