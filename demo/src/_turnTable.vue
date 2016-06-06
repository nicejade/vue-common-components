<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2#hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2#hinting-title {{ hintingTitle2 }}
</template>

<script type="text/javascript">
import turnTable from 'turnTable';
import preCode from './preCode.vue'

export default {
    data () {
        return {
            compTitle : "Component Name",
            hintingTitle: "使用示例:",
            hintingTitle2: "表现示例:",
            codeString: `
    import turnTable from 'turnTable'; //引入组件

    //模板中可以按需传递参数;
    <turn-table :tools='Tools' :turn-table-config='turnTableConfig'></turn-table>

    // vue逻辑处理代码
    <script>
        import ActTools from  "ActTools";
        var Tools = ActTools.tools;

        export default {
            data () {
                return {
                    Tools: Tools, 
                    turnTableConfig: {
                        rewardKinds: 8,     // 奖励种类数；可不传，默认8
                        rotateNums: 2,      // 转盘旋转圈数；可不传，默认3
                        callBackFunc: ( textMsg )=>{
                            var dlgMsgObj = {
                                titleText: "&温馨提示&", 
                                bodyText: textMsg,
                                btnsObj: {
                                    0: {
                                        btnText: "取消",
                                        callBackFunc: null
                                    },
                                    1: {
                                        btnText: "确认",
                                        callBackFunc: null
                                    }
                                },
                                isShowCloseXFlag: true
                            }
                            this.$broadcast('show-strong-dlg', dlgMsgObj);
                        }
                    }
                }
           },
          components: {
              turnTable,
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
        preCode,
    },
    methods: {
    },
    events: {
        'on-countdown-finish': function (countNum) {
            // countNum 统计调用此 countDown 次数;
            alert("countdown had down; num = " + countNum )
        }
    }
}
</script>