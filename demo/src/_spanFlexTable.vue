<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2.hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2.hinting-title {{ hintingTitle2 }}
    a(href='javascript:;' @click="onAddLineClick" class='common-a') {{ addLine }}
    a(href='javascript:;' @click="onAddColumnClick" class='common-a') {{ addColumn }}
    div.comp-area
        <span-flex-table :table-list.sync='tableList'></span-flex-table>
</template>

<script type="text/javascript">
import spanFlexTable from 'spanFlexTable'
import preCode from './preCode.vue'

export default {
    data () {
        return {
            compTitle : "Component Name",
            xLimitControl:3,
            yLimitControl:4,
            addLine: "Add Line",
            addColumn: "Add Column",
            hintingTitle: "使用示例:",
            hintingTitle2: "表现示例:",
            tableList: [],
            codeString: `
    import spanFlexTable from 'spanFlexTable'; //引入组件

    //在模板中如下加入组件即可(定义tabList数组/Object)：
    <span-flex-table :table-list.sync='tableList'></span-flex-table>`
        }
    },
    ready(){
        this.setTableList()
    },
    route:{
		data(transition){
            this.compTitle = transition.to.name
		}
	},
    components: {
        spanFlexTable,
        preCode,
    },
    methods: {
        setTableList: function(){
            let tempArr = [];
            for(let i=0; i<= this.xLimitControl; i++){
                tempArr[i] = []
                for(let j=0; j<=this.yLimitControl; j++){
                    tempArr[i][j] = 'iLoveU' + j;
                }
            }
            this.tableList = tempArr
        },
        onAddLineClick: function(){
            this.xLimitControl += 1
            this.xLimitControl = (this.xLimitControl < 5) ? this.xLimitControl : 0
            this.setTableList()
        },
        onAddColumnClick: function(){
            this.yLimitControl += 1
            this.yLimitControl = (this.yLimitControl <= 5) ? this.yLimitControl : 0
            this.setTableList()
        }
    }
}
</script>

<style media="screen">
#components-wraper #span-flex-table{
    width: 77%;
    margin: 3% auto;
    background-color: #222222;
    color: #f2f2f2;
}
</style>
