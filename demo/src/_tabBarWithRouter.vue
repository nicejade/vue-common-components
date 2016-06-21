<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2#hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2#hinting-title {{ hintingTitle2 }}
    div.comp-area
        <tab-bar-with-router :tab-list.sync="tabList"></tab-bar-with-router>
        div.content
            <router-view></router-view>
</template>

<script type="text/javascript">
import tabBarWithRouter from 'tabBarWithRouter'
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
    float: right;
    margin: 2% 0 1% 2%;
    padding: 1%;
    background-color: rgba(11,11,11,.6);
}
.tab-bar-li.active{
    background-color: #523B76;
}
</style>
