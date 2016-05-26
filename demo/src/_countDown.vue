<template lang='jade'>
    h1#comp-title {{ compTitle }}
    h2#hinting-title {{ hintingTitle }}
    <pre-code :code-string="codeString"></pre-code>
    a(href='javascript:;' @click="onStartCountClick" class='demonstrate-a') {{ btnText }}
    <count-down :time.sync="time" :is-complete-show-hms="isCompleteShowHms" :fore-time-text="foreTimeText" :last-time-text="lastTimeText" :start.sync="isStartCount"></count-down>
</template>

<script type="text/javascript">
import countDown from 'countDown'
import preCode from './preCode.vue'

export default {
    data () {
        return {
            btnText: "StartCountDown",
            compTitle : "Component Name",
            hintingTitle: "Using Sample Code:",
            foreTimeText: "倒计时fore",
            lastTimeText: "倒计时end",
            isCompleteShowHms: true,
            time: 0,
            isStartCount: false,
            codeString: `
    import countDown from 'countDown'; //引入组件

    //模板中可以按需传递参数;
    <count-down :time.sync="time" :is-complete-show-hms="isCompleteShowHms" :start.sync="isStartCount"
                :fore-time-text="foreTimeText" :last-time-text="lastTimeText" ></count-down>

    // vue逻辑处理代码
    methods: {
        onStartCountClick: function(){
            this.time = 2113;
            this.isStartCount = true;
        }
    },
    events: {
        'on-countdown-finish': function (countNum) {
            // countNum 统计调用此 countDown 次数;
            alert("countdown had down; num = " + countNum )
        }
    }

    /*
    time: 倒计时时间(type: Number;单位：秒s)；值小于0，则不显示；默认值：60；
        超过60s会将显示对应转换为默认是xx时yy分zz秒;可从 timeUnitObj 传参改变时间单位；
    start: 是否立即开始(type：Boolean)；默认值：false
    isCompleteShowHms: 是否完整显示“xx时yy分zz秒”，默认false。
    foreTimeText： 承载倒计时数字span之前标签内容；不传不显示此span；默认值：""
    lastTimeText： 承载倒计时数字span之后标签内容；不传不显示此span；默认值：""
    /*
    `
        }
    },
    route:{
		data(transition){
            this.compTitle = transition.to.name
		}
	},
    components: {
        countDown,
        preCode,
    },
    methods: {
        onStartCountClick: function(){
            this.time = 9;
            this.isStartCount = true;
        }
    },
    events: {
        'on-countdown-finish': function (countNum) {
            // countNum 统计调用此 countDown 次数;
            alert("countdown had down; num = " + countNum )
        }
    }
}
</script>

<style media="screen">
#normal-dlg-body{
    top: 39% !important;
}
</style>
