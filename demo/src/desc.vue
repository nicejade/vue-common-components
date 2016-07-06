<template lang="jade" id="desc">
    h1.welcome {{ welcome }}
    a(class="desc-a" href="https://nicejade.gitbooks.io/vue-components-doc/content/index.html") {{ vueDoc }}
    div.desc-img
        img(src='http://7xoosr.com1.z0.glb.clouddn.com/vue-common-components.jpg')
    div.comp-area
        <annotate :blockquote-str='blockquoteStr'></annotate>
</template>


<script type="text/javascript">
import annotate from './annotate.vue'

export default {
    data () {
        return {
            welcome: "Vue Common Components Desc & Example",
            vueDoc: "Vue Common Components Doc(gitbooks)",
            blockquoteStr:`
                <strong>微注：</strong> 此为使用 <strong> Vue </strong>，<strong>Webpack</strong>，<strong>Jade</strong>，
                <strong>Es6</strong>等编写的些常用组件；具体在
                <a class="link-color-a" href="http://www.jeffjade.com/2016/07/06/110-vue-webpack-component-develop/">Vue Webpack 组件化开发实践</a>
                杂文中加以叙述；其<strong>Github</strong> 地址为：
                <a class="link-color-a" href="https://github.com/nicejade/vue-common-components" target="_blank">vue-common-components</a>。
            `
        }
    },
    components: {
        annotate,
    },
}
</script>

<style media="screen" scoped>
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
    text-decoration: none;
}
.desc-img{
    width: 100%;
}
.desc-img>img{
    width: 100%;
}
.comp-area{
    margin-left: 0;
}
</style>
