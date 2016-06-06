<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2#hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2#hinting-title {{ hintingTitle2 }}
    a(href='javascript:;' @click="onCallDemoClick" class='demonstrate-a ahead') {{ showStrongDlgText }}
    br
    a(href='javascript:;' @click="onCloseDemoClick" class='demonstrate-a ahead') {{ hideStrongDlgText }}
    div.comp-area
        strong-dialog
</template>

<script type="text/javascript">
import strongDialog from 'strongDialog'
import preCode from './preCode.vue'

export default {
    data () {
        return {
            showStrongDlgText: "show StrongDialog",
            hideStrongDlgText: "hide StrongDialog",
            hintingTitle: "使用示例:",
            hintingTitle2: "表现示例:",
            compTitle : "Component Name",
            codeString: `
    import strongDialog from 'strongDialog';  //引入组件

    function leftCallback(){
        console.log('leftCallback To Here');
    }

    function rightCallback(){
        console.log('rightCallback To Here');
    }

    var dlgMsgObj = {
        titleText: "&温馨提示&",
        bodyText: text+'<b>JeffJade|www.jeffjade.com</b>',
        closeXCallBack: null, //关掉顶部 X 按钮执行的回调;
        btnsObj: {
            0: {
                btnText: "取消",
                callBackFunc: leftCallback
            },
            1: {
                btnText: "确认",
                callBackFunc: rightCallback
            }
        },
        isShowCloseXFlag: true
    }
    this.$broadcast('show-strong-dlg', dlgMsgObj);

    this.$broadcast('hide-strong-dlg');  //主动关闭 StrongDlg；`
        }
    },
    route:{
		data(transition){
            this.compTitle = transition.to.name
		}
	},
    components: {
        strongDialog,
        preCode,
    },
    methods: {
        onCallDemoClick: function(){
            function leftCallback(){
                console.log('leftCallback To Here');
            }

            function rightCallback(){
                console.log('rightCallback To Here');
            }

            var dlgMsgObj = {
                titleText: "&温馨提示&",
                bodyText: "<b>JeffJade<a href='http://www.jeffjade.com'>www.jeffjade.com</a></b>",
                closeXCallBack: null, //关掉顶部 X 按钮执行的回调;
                btnsObj: {
                    0: {
                        btnText: "取消",
                        callBackFunc: leftCallback
                    },
                    1: {
                        btnText: "确认",
                        callBackFunc: rightCallback
                    }
                },
                isShowCloseXFlag: true
            }
            this.$broadcast('show-strong-dlg', dlgMsgObj);
        },
        onCloseDemoClick: function(){
            this.$broadcast('hide-strong-dlg');
        }
    }
}
</script>
