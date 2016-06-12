<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2.hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2.hinting-title {{ hintingTitle2 }}
    a(href='javascript:;' @click="onCallDemoClick" class='demonstrate-a') {{ btnText }}
    div.comp-area
        popup-toast
</template>

<script type="text/javascript">
import popupToast from 'popupToast'
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
    this.$broadcast('show-popup-toast', toastMsg);`
        }
    },
    route:{
		data(transition){
            this.compTitle = transition.to.name
		}
	},
    components: {
        popupToast,
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
