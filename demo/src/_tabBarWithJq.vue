<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2.hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2.hinting-title {{ hintingTitle2 }}
    div.comp-area
        <tab-bar-with-jq :tab-list.sync="tabList"></tab-bar-with-jq>
        div.content
            section {{ prefixStr + tabList[0] }}
            section(style="display:none;") {{ prefixStr + tabList[1] }}
            section(style="display:none;") {{ prefixStr + tabList[2] }}
            section(style="display:none;") {{ prefixStr + tabList[3] }}
</template>

<script type="text/javascript">
import tabBarWithJq from 'tabBarWithJq'
import preCode from './preCode.vue'

export default {
    data () {
        return {
            hintingTitle2: "表现示例:",
            compTitle : "Component Name",
            hintingTitle: "使用示例:",
            prefixStr: "当前页面是: ",
            tabList: {
                "0": "赵钱孙李",
                "1": "周吴郑王",
                "2": "冯陈诸卫",
                "3": "蒋沈韩杨",
            },
            codeString: `
    import tabBarWithJq from 'tabBarWithJq'; //引入组件

    //在模板(jade)中如下注入组件and标签页即可(定义tabList数组/Object)：
    <tab-bar-with-jq :tab-list.sync="tabList"></tab-bar-with-jq>
    div.content
        section {{ tabList[1] }}
        section(style="display:none;") {{ tabList[2] }}
        section(style="display:none;") {{ tabList[3] }}
        section(style="display:none;") {{ tabList[4] }}`
        }
    },
    route:{
		data(transition){
            this.compTitle = transition.to.name
		}
	},
    components: {
        tabBarWithJq,
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
