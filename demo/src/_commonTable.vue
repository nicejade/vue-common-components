<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2.hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2.hinting-title {{ hintingTitle2 }}
    div.comp-area
        <annotate :blockquote-str='blockquoteStr'></annotate>
        a(href='javascript:;' @click="onChangeHeightClick" class='common-a') {{ fixedHeightText }}
        a(href='javascript:;' @click="onAddLineClick" class='common-a') {{ addRow }}
        a(href='javascript:;' @click="onAddColumnClick" class='common-a') {{ addColumn }}
        <common-table :table-list.sync='tableList'></common-table>
</template>

<script type="text/javascript">
import commonTable from 'commonTable'
import annotate from './annotate.vue'
import preCode from './preCode.vue'

export default {
    data () {
        return {
            hintingTitle2: "表现示例:",
            compTitle : "Component Name",
            xLimitControl:3,
            yLimitControl:4,
            addRow: "Add row",
            addColumn: "Add Column",
            fixedHeightText: "Not Fix Height",
            isFixedHeightFlag: true,
            hintingTitle: "使用示例:",
            tableList: [],
            tableList2: [],
            codeString: `
    import commonTable from 'commonTable'; //引入组件

    //在模板中如下加入组件即可(定义tabList数组/Object)：
    <common-table :table-list.sync='tableList'></common-table>`,
            blockquoteStr:`
                <strong>微注：</strong> 使用 ul li span 三者组合，来模拟 table,不仅在 Dom 层次上更为精简而高效，
                而且也非常方便扩展之，使其完成更为复杂需求；比如：可以传递html标签譬如 <em style='color:#009ad6'>< span>String Content< /span></em>
                替代普通String内容(那边会自动解析)，如此表格就可轻易按照你的想法扩展了，包括表格中夹杂响应事件|图标等等。
            `
        }
    },
    ready(){
        this.setTableList()
        setTimeout( ()=>{
            this.updateTableHeight()
        }, 0)
    },
    route:{
  		data(transition){
            this.compTitle = transition.to.name
  		}
	 },
    components: {
        commonTable,
        annotate,
        preCode,
    },
    methods: {
        setTableList: function(){
            let tempArr = [];
            for(let i=0; i<= this.xLimitControl; i++){
                tempArr[i] = []
                for(let j=0; j<=this.yLimitControl; j++){
                    tempArr[i][j] = 'iLoveU:' + i + '*' + j;
                }
            }
            this.tableList = tempArr
        },
        updateTableHeight: function(){
            if(this.isFixedHeightFlag){
                $('.common-table-ul').addClass('table-height')
            }else{
                $('.common-table-ul').removeClass('table-height')
            }
        },

        // -------------------------------------------default click callBack function
        onAddLineClick: function(){
            this.xLimitControl += 1
            this.xLimitControl = (this.xLimitControl < 5) ? this.xLimitControl : 0
            this.setTableList()
        },
        onAddColumnClick: function(){
            this.yLimitControl += 1
            this.yLimitControl = (this.yLimitControl <= 5) ? this.yLimitControl : 0
            this.setTableList()
        },
        onChangeHeightClick: function(){
            this.isFixedHeightFlag = !this.isFixedHeightFlag
            this.fixedHeightText = this.isFixedHeightFlag ? "Not Fixed Height" : "Fixed Height"
            this.updateTableHeight()
        }
    }
}
</script>

<style media="screen">
#components-wraper .common-table-ul{
    margin-top: 2%;
    display: block;
    background-color: rgba(22,22,22, 1);
}
.table-height{
    height: 12em;
}
</style>
