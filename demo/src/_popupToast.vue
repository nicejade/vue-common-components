<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2.hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2.hinting-title {{ hintingTitle2 }}
    div.comp-area
        <annotate :blockquote-str='blockquoteStr'></annotate>
        a(href='javascript:;' @click="onCallDemoClick" class='demonstrate-a') {{ btnText }}
        popup-toast
</template>


<script type="text/javascript">
import popupToast from 'popupToast'
import annotate from './annotate.vue'
import preCode from './preCode.vue'

export default {
    data () {
        return {
            compTitle : "Component Name",
            hintingTitle: "使用示例:",
            hintingTitle2: "表现示例:",
            btnText: "Call PopupToast",
            codeString: `
    import popupToast from 'popupToast';  //引入组件

    var toastMsg = {
        bodyText: text,
        timer: 2222,           //可不传；默认2000ms
        callBackFunc: function(){ alert('test')}  // 可不传，默认null；
    }
    this.$broadcast('show-popup-toast', toastMsg);`,
        blockquoteStr:`
            <strong>微注：</strong> Vue可使用 props 来为组件间传递数据；但是对于动态变更频繁数据，这样传递写起来会略为麻烦：
            引入组件，注册组件，template中注入，data()中定义数据，请求/事件等完毕后填充数据，最终激活组件；故而，为使用便捷，
            在编写有 Widgets 组件时，涉及到数据需要动态改变，且组件也随事件变动show/hide的话，就采用 $dispatch() 和 $broadcast()
            来广播和派发事件；当然这些方法在 Vue2.0 中已经被摒弃；可参见<a href="https://github.com/vuejs/vue/issues/2873">Vue2.0 Features</a>。
        `
        }
    },
    route:{
		data(transition){
            this.compTitle = transition.to.name
		}
	},
    components: {
        popupToast,
        annotate,
        preCode,
    },
    methods: {
        onCallDemoClick: function(){
            var toastMsg = {
                bodyText: "www.jeffjade.com",
                timer: 2222,           //可不传；默认2000ms
                callBackFunc: function(){console.log('callback down!')}
            }
            this.$broadcast('show-popup-toast', toastMsg);
        }
    }
}
</script>
