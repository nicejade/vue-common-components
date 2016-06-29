<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2.hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    h2.hinting-title {{ hintingTitle2 }}
    div.comp-area
        <annotate :blockquote-str='blockquoteStr'></annotate>
</template>

<script type="text/javascript">
// import formDialog from 'formDialog'
import preCode from './preCode.vue'
import annotate from './annotate.vue'

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
	this.$broadcast('show-form-dlg', dlgMsgObj);`,
           blockquoteStr: `此为常用填写表单组件，包括Name，Phone，Address等常用信息，以及简单的甄别判断；
           内部封装了拉取/提交数据的操作（采用Jquery的ajax，未使用vue提供的 vue-resource）；
           当然这在日常开发中并无很大参考性，鉴于早先如此使用，很是便捷，仅是作为组件话开发历程记载而已。
           鉴于这缘由，就不阉割之以做分享了，此处也就未做使用示例；聚沙成塔，集腋成裘，希望在日后不断学习积淀中，
           可以成就一些更实用而nice的组件，Fighting，Go。`
        }
    },
    route:{
		data(transition){
            this.compTitle = transition.to.name
		}
	},
    components: {
        preCode,
        annotate,
    },
    methods: {
    }
}
</script>
