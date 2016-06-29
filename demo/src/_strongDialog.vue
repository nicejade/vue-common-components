<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2.hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2.hinting-title {{ hintingTitle2 }}
    div.comp-area
        <annotate :blockquote-str='blockquoteStr'></annotate>
        a(href='javascript:;' @click="onCallDemoClick" class='demonstrate-a ahead') {{ showStrongDlgText }}
        br
        a(href='javascript:;' @click="onCloseDemoClick" class='demonstrate-a ahead') {{ hideStrongDlgText }}
        div.hold-comp-area
            strong-dialog
            popup-toast
</template>

<script type="text/javascript">
import strongDialog from 'strongDialog'
import popupToast from 'popupToast'
import preCode from './preCode.vue'
import annotate from './annotate.vue'

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

    this.$broadcast('hide-strong-dlg');  //主动关闭 StrongDlg；`,
            blockquoteStr:`<strong>微释：</strong>此为一个功能还算丰富的 Dialog 组件(相比于 normalDialog 组件，使用起来就稍显严格)；
                弹框右上角的关闭按钮是否需要，弹框Tilte是否显示，主体按钮个数(0~2)等等，都会根据所传参数自行控制；
                另外对于弹框内容部分，也做了对 html 支持，因此可以任意去填充 Dialog 内容。如此，也是个人编程理念的体现，
                在功能强大跟便捷性之间总要做些权衡，会是倾向于便捷高效基础上尽可能使其强大。`
        }
    },
    route:{
		data(transition){
            this.compTitle = transition.to.name
		}
	},
    components: {
        strongDialog,
        popupToast,
        preCode,
        annotate,
    },
    methods: {
        showPopupToast: function( text ){
            var toastMsg = {
                bodyText: text,
                timer: 2222,           //可不传；默认2000ms
                callBackFunc: function(){console.log('callback down!')}
            }
            this.$broadcast('show-popup-toast', toastMsg);
        },
        onCallDemoClick: function(){
            var _That = this;
            function leftCallback(){
                _That.showPopupToast('excute left-btn callback')
            }

            function rightCallback(){
                _That.showPopupToast('excute right-btn callback')
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
