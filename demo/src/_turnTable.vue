<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2.hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2.hinting-title {{ hintingTitle2 }}
    div.comp-area
        <annotate :blockquote-str='blockquoteStr'></annotate>
        <turn-table  :turn-table-config='turnTableConfig'></turn-table>
        a(href='javascript:;' class="common-a start-draw" @click="onStartDrawClick") {{ startDrawText }}
        strong-dialog
</template>

<script type="text/javascript">
import turnTable from 'turnTable';
import annotate from './annotate.vue'
import preCode from './preCode.vue'
import strongDialog from 'strongDialog'

export default {
    data () {
        return {
            compTitle : "Component Name",
            hintingTitle: "使用示例:",
            hintingTitle2: "表现示例:",
            startDrawText: "开启大转盘",
            turnTableConfig: {
                rewardKinds: 8,    //奖励种类数
                resumeDelay: 2000, //旋转停止回调延时
                rotateNums: 2,     // 转盘旋转圈数；默认3
                imgOffset: 0,      //初始指针与图片的偏移
                isTableRotate:true,  //true为转盘旋转，false为指针旋转
                pointNum: null,
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
            },
            codeString: `
        import turnTable from 'turnTable'; //引入组件

        //模板中可以按需传递参数;
        <turn-table  :turn-table-config='turnTableConfig'></turn-table>

        // vue逻辑处理代码(也可外部广播"turntable-msg"消息开启大转盘)
        <script>
            import turnTable from 'turnTable';

            export default {
                data () {
                    return {
                        Tools: Tools,
                        turnTableConfig: {
                            rewardKinds: 8,    //奖励种类数
                            resumeDelay: 1000, //旋转停止回调延时
                            rotateNums: 2,     // 转盘旋转圈数；默认3
                            imgOffset: 22.5,   //初始指针与图片的偏移
                            isTableRotate: false,  //true为转盘旋转，false为指针旋转
                            pointNum: 6,       // 旋转指针指向位置(起始于1),如果将请求后台封装在组件内，则无需如此；
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
        < /script>`,
            blockquoteStr: `这是一个阉割版本的转盘抽奖组件；在生产环境，蛮建议将请求的后代数据也封装于组件之内(如有不同，可传接口)，
                如此，后续使用需要关注的内容就更少，善莫大焉。此组件，已较丰富完善，譬如旋转主体可设置转盘or指针、开启大转盘抽奖，
                承载的操作主题可以是指针按钮，抑或外部按钮(广播"turntable-msg"消息即可)；使用时，只需提供两张好的图外加微调样式即可；
                当然如果奖品在一次活动之内，连奖品类型都是动态的话，需另写组件予以支持。`
            }
    },
    route:{
		data(transition){
            this.compTitle = transition.to.name
		}
	},
    components: {
        preCode,
        turnTable,
        annotate,
        strongDialog,
    },
    methods: {
        onStartDrawClick: function(){
            this.$broadcast('turntable-msg')
        }
    },
    events: {
    }
}
</script>

<style media="screen">
#turntable-drawbox{
    background-image: url(http://nicejade.github.io/jade/table.png);
    background-size: 100% 100%;
}
#turntable-drawpoint{
    background-image: url(http://nicejade.github.io/jade/point.png);
    background-size: 100% 100%;
}
.start-draw{
    display: inline-block;
    left: 50%;
    margin: auto;
    line-height: normal;
    transform: translate(-50%,0);
}
</style>
