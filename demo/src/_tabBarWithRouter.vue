<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2#hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2#hinting-title {{ hintingTitle2 }}
    div.comp-area
        <annotate :blockquote-str='blockquoteStr'></annotate>
        <tab-bar-with-router :tab-list.sync="tabList"></tab-bar-with-router>
        div.content
            <router-view></router-view>
</template>

<script type="text/javascript">
import tabBarWithRouter from 'tabBarWithRouter'
import annotate from './annotate.vue'
import preCode from './preCode.vue'
var tabbarConfig = require('./../config/tabbar.config.js')();

export default {
    data () {
        return {
            hintingTitle2: "表现示例:",
            compTitle : "Component Name",
            hintingTitle: "使用示例:",
            tabList: tabbarConfig,
            codeString: `

    //在模板(jade)中如下注入组件and标签页即可(定义tabList数组/Object)：
    <template lang='jade'>
        <tab-bar-with-router :tab-list.sync="tabList"></tab-bar-with-router>
        div.content
                <router-view></router-view>
    <template lang='jade'>

    <script type="text/javascript">
        import tabBarWithRouter from 'tabBarWithRouter'
        var tabbarConfig = require('./../config/tabbar.config.js')();

        export default {
            data () {
                return {
                    tabList: tabbarConfig,
            },
            components: {
                tabBarWithRouter,
            }
        }
    < /script>
    `,
        blockquoteStr:`
            <strong>温馨提示：</strong>此组件以 v-link(一个用来让用户在 vue-router 应用的不同路径跳转的指令)来实现单页面 Tab 栏切换，
            意在让可重复利用 Tab页面组件化，并且可自由配置化，而无需人为进行 import，从而达到节省人力的目的；并且也有别于 tabBarWithJq,
            不去依赖 Jquery 以及特别约定(类/Section/Dom结构)的限制，从而让组件的使用可更为自由化。<strong style="color:#f00">微注：</strong>
            但目前尚在完善更新阶段，还有诸多瑕疵需要解决: 比如组件动态数据的注入，v-link-active的添加等等。
        `
        }
    },
    route:{
		data(transition){
            this.compTitle = transition.to.name
		}
	},
    components: {
        tabBarWithRouter,
        annotate,
        preCode,
    },
    methods: {
    }
}
</script>

<style media="screen">
.content{
    margin-top: 2%;
    height: 3em;
    line-height: 3;
    width: 100%;
    display: inline-block;
    text-align: center;
    background-color: #2F2F2F;
    color: purple;
    font-size: 2em;
}
.tab-bar-li{
    float: left;
    margin: 2% 2% 1% 0%;
    padding: 1%;
    background-color: rgba(11,11,11,.6);
}
.tab-bar-li.active{
    background-color: #523B76;
}
</style>
