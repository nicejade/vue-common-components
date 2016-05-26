<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2#hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    a(href='javascript:;' @click="onCallDemoClick" class='demonstrate-a') {{ btnText }}
    popup-toast
</template>

<script type="text/javascript">
import popupToast from 'popupToast'
import preCode from './preCode.vue'

export default {
    data () {
        return {
            btnText: "Using Demonstrate",
            compTitle : "Component Name",
            hintingTitle: "Using Sample Code:",
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
