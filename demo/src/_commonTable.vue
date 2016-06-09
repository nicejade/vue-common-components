<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2#hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2#hinting-title {{ hintingTitle2 }}
    a(href='javascript:;' @click="onAddLineClick" class='common-a') {{ addLine }}
    a(href='javascript:;' @click="onAddColumnClick" class='common-a') {{ addColumn }}
    div.comp-area
        <common-table :table-list.sync='tableList'></common-table>
</template>

<script type="text/javascript">
import commonTable from 'commonTable'
import preCode from './preCode.vue'

export default {
    data () {
        return {
            hintingTitle2: "表现示例:",
            compTitle : "Component Name",
            xLimitControl:3,
            yLimitControl:4,
            addLine: "Add Line",
            addColumn: "Add Column",
            hintingTitle: "使用示例:",
            tableList: [],
            codeString: `
    import commonTable from 'commonTable'; //引入组件

    //在模板中如下加入组件即可(定义tabList数组/Object)：
    <common-table :table-list.sync='tableList'></common-table>`
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
        commonTable,
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
#components-wraper #common-table-ul{
    margin-top: 3%;
    display: block;
    height: 15em;
    background-color: #222222;
}
</style>
