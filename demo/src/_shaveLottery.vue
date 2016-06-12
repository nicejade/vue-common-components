<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2.hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2.hinting-title {{ hintingTitle2 }}
    div.comp-area
        div.demo-check-area
            <input type="radio" id="radio-one" value="1" v-model="picked">
            <label for="one">lotteryType: text</label>
            <br>
            <input type="radio" id="radio-two" value="2" v-model="picked">
            <label for="two">lotteryType: image</label>
            <br>
        <shave-lottery :params-list.sync='paramsList'></shave-lottery>
        normal-dialog
</template>

<script type="text/javascript">
import shaveLottery from 'shaveLottery'
import normalDialog from 'normalDialog'
import preCode from './preCode.vue'

export default {
    data () {
        return {
            compTitle : "Component Name",
            hintingTitle: "使用示例:",
            hintingTitle2: "表现示例:",
            picked: 'default',
            paramsList: {
                width: 360,
                height: 356,
                cover: '#999',
                coverType: 'color',
                paintSize: 26,
                lotteryContent: "http://www.jeffjade.com",
                lotteryType: 'text',
                callBackFunc: this.onShowNormalDlg
            },
            codeString: `
    import shaveLottery from 'shaveLottery'; //引入组件

    //在模板中如下加入组件即可(定义paramsList传递需要的参数即可)：
    <shave-lottery :params-list.sync='paramsList'></shave-lottery>

    //在逻辑代码中调用Like This即可；
    <script type="text/javascript">
    import shaveLottery from 'shaveLottery'
    import normalDialog from 'normalDialog'

    export default {
        data () {
            return {
                paramsList: {
                    width: 360,
                    height: 356,
                    cover: '#999',
                    coverType: 'color',
                    paintSize: 26,
                    lotteryContent: "http://www.jeffjade.com",
                    lotteryType: 'text',
                    callBackFunc: this.onShowNormalDlg
                }
            }
        }
    }
    </ script>`
        }
    },
    route:{
		data(transition){
            this.compTitle = transition.to.name
		}
	},
    watch: {
        picked: function (newVal, oldVal) {
        	if(newVal === '1'){
                this.paramsList = {
                    width: 360,
                    height: 356,
                    cover: '#999',
                    coverType: 'color',
                    paintSize: 26,
                    lotteryContent: "www.jeffjade.com",
                    lotteryType: 'text',
                    callBackFunc: this.onShowNormalDlg
                }
            }else if(newVal === '2'){
                this.paramsList = {
                    width: 360,
                    height: 356,
                    cover: '#999',
                    coverType: 'color',
                    paintSize: 26,
                    lotteryContent: 'http://7xoosr.com1.z0.glb.clouddn.com/encourage.png',
                    lotteryType: 'image',
                    callBackFunc: this.onShowNormalDlg
                }
            }
        }
    },
    components: {
        shaveLottery,
        normalDialog,
        preCode,
    },
    methods: {
        onShowNormalDlg: function( text ){
            var dlgMsgObj = {
                titleText: "&温馨提示&",       //可不传，默认 “温馨提示”
                bodyText: text,
                confirmText: "确认",             //可不传，默认 “确认”
                callBackFunc: null,
                isShowCloseXFlag: true       //可不传，默认 true
            }

            // var dlgMsgObj = text;  //如不需更改Dlg默认文案等，可只 文本内容字符串（String）
            this.$broadcast('show-normal-dlg', dlgMsgObj);
        }
    }
}
</script>

<style media="screen">
.demo-check-area{
    position: relative;
    margin: 1% auto;
}
</style>
