<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2.hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2.hinting-title {{ hintingTitle2 }}
</template>

<script type="text/javascript">
import formDialog from 'formDialog'
import preCode from './preCode.vue'

export default {
    data () {
        return {
            compTitle : "Component Name",
            hintingTitle: "使用示例:",
            hintingTitle2: "表现示例:",
            codeString: `
    import formDialog from 'formDialog';; //引入组件

    //模板中可以按需传递参数;
    <form-dialog></form-dialog>

    // vue逻辑处理代码
    var dlgMsgObj = {
	    //*Tools必传；组件涉及数据请求
	    Tools: Tools, 
	    //*可不用传；以下示例皆为默认参数
	    userName: '姓名',       
	    userPhone: '<b>*</b>电话',
	    userAddress: '地址',
	    leftBtnText: '提交',
	    rightBtnText: '取消',
	    namePlaceholder: '请输入姓名',
	    phonePlaceholder: '请重新输入电话号码',
	    addressPlaceholder: '请输入您的地址',
	    verifyPhoneNumReg: null,    //验证手机号是否合法正则;
	    callBackFunc: null,         //如果提交完毕，想做什么(succ tips)可放在这里；
	}
	this.$broadcast('show-form-dlg', dlgMsgObj);
    `
        }
    },
    route:{
		data(transition){
            this.compTitle = transition.to.name
		}
	},
    components: {
        formDialog,
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