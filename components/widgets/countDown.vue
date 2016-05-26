<template>
    <span class="count-down-fore" v-if='isShowForeTextFlag'>{{ foreTimeText }}</span>
    <span class="count-down-time" v-if='isShowCountDownFlag'>{{ contDownText }}</span>
    <span class="count-down-last" v-if='isShowLastTextFlag'>{{ lastTimeText }}</span>
</template>

<script>
export default {
    data(){
        return {
            intervalId: null,
            countNum: 0,
            contDownText: "",
            isShowForeTextFlag: false,
            isShowLastTextFlag: false,
            isShowCountDownFlag: false
        }
    },

    props: {
        foreTimeText:{
            type: String,
            default: ""
        },
         lastTimeText:{
            type: String,
            default: ""
        },
        time: {
            type: Number,
            default: 60
        },
        start: {
            type: Boolean,
            default: false
        },
        isCompleteShowHms: {
            type: Boolean,
            default: false
        },
        timeUnitObj:{
            type: Object,
            default: function(){
                return{
                    hour: "时",
                    minute: "分",
                    second: "秒"
                }
            }
        }
    },

    ready () {
        if (this.start) {
            this.tick()
        }
    },

    methods: {
        tick: function(){
            var count = 0,
                startTime = new Date().getTime();

            if(this.time > 0){
                this.intervalId = setTimeout(countDownStart, 1000)
                this.convertToHms( this.time )
                this.setTextIsShowFlag( true )
            }

            var _That = this;
            function countDownStart(){
                count++
                var offset = new Date().getTime() - (startTime+ count*1000)
                var nextTime = 1000 - offset;
                nextTime = (nextTime < 0) ? 0 : nextTime
                _That.time--
                if(_That.time < 0){
                    _That.stop()
                    _That.start = false
                    _That.countNum++
                    _That.$dispatch('on-countdown-finish', _That.countNum)
                }else{
                    _That.convertToHms( _That.time )
                    _That.intervalId = setTimeout(countDownStart, nextTime)
                }
            }
        },

        convertToHms: function( secondTime ){
            let hour, minute
            let HOUR=3600, MINUTE=60, ZERO=0;
            let hourUnit = this.timeUnitObj['hour'],
                minuteUnit = this.timeUnitObj['minute'],
                secondUnit = this.timeUnitObj['second'];
            if(secondTime >= HOUR){
                hour = Math.floor( secondTime/HOUR )
                secondTime -= hour*HOUR
                minute = Math.floor( secondTime/MINUTE )
                secondTime -= minute*MINUTE
                this.contDownText = (hour + hourUnit + minute + minuteUnit + secondTime + secondUnit)
            }else if(secondTime <= 60){
                this.contDownText = (secondTime + secondUnit )
                if( this.isCompleteShowHms == true){
                    this.contDownText = (ZERO + hourUnit + ZERO + minuteUnit + this.contDownText)
                }
            }else{
                minute = Math.floor( secondTime/MINUTE )
                secondTime -= minute*MINUTE
                this.contDownText = (minute + minuteUnit + secondTime + secondUnit)
                this.contDownText = (this.isCompleteShowHms == true) ? (ZERO+hourUnit+this.contDownText) : this.contDownText
            }
        },

        stop: function () {
            clearInterval(this.intervalId)
        },

        setTextIsShowFlag: function( cFlag ){
            this.isShowForeTextFlag = (this.foreTimeText !== "" && cFlag) ? true : false;
            this.isShowLastTextFlag = (this.lastTimeText !== "" && cFlag) ? true : false;
            this.isShowCountDownFlag = (this.time > 0 && cFlag ) ? true : false;
        }
    },

    watch: {
        start: function (newVal, oldVal) {
            if (newVal === true && oldVal === false && this.time > 0) {
                this.tick()
            }
            if (newVal === false && oldVal === true) {
                this.stop()
            }
        },
        time: function(newVal, oldVal){
            if( this.time > 0 ){
                this.setTextIsShowFlag(true)
            }else{
                this.setTextIsShowFlag(false)
            }
        }
    }
}
</script>
