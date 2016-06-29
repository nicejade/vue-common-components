<!--Date: 16-04-18
    LastModify: 16-06-29
	Author: jeffjade
	Desc: 大转盘/抽奖等功能模块组件
 -->
 <template lang="jade">
	#turntable-root
		#turntable-drawbox
		div(id="turntable-drawpoint" v-on:click="onDrawboxCallback")
</template>


<script>
export default {
	data(){
		return{
			$turnTarget:null,
			requestSuccMsg: "转盘已经执行完毕啦(From Default Msg)"
		}
	},

	ready(){
		let isTableRotateFlag = this.turnTableConfig.isTableRotate
		this.$turnTarget = (isTableRotateFlag === true) ? $('#turntable-drawbox') : $('#turntable-drawpoint')

		this.$turnTarget[0].addEventListener('webkitTransitionEnd', ()=>{
            setTimeout( ()=>{
            	this.excuteCallBackFunc()
            	this.$turnTarget.removeClass('turntable-transition').css({'-webkit-transform' : 'rotate(0deg)','transform' : 'rotate(0deg)'});
            }, this.turnTableConfig.resumeDelay );
		}, false);
	},

	props:{
        turnTableConfig:{
        	type: Object,
        	default: function(){
        		return {
        			rewardKinds: 8,
        			resumeDelay: 1000,
        			rotateNums: 3,
        			imgOffset: 22.5,
                    pointNum: 3,
        			isTableRotate:false,
        			callBackFunc: null
        		}
        	}
        }
	},

	methods: {
		onDrawboxCallback: function(event){
			this.startupDrawbox()
		},
		startupDrawbox: function(){
            // Here: 到生产环境，建议将请求后端数据封装在此处(只需传回来获奖类型位置以及msg即可)；

			let rotateNums = this.turnTableConfig.rotateNums || this.getRandom(1, this.turnTableConfig.rewardKinds)
			let offset = (360/this.turnTableConfig.rewardKinds)*(this.turnTableConfig.pointNum-1)
			let angel = 0;
			if( this.turnTableConfig.isTableRotate ){
				angel = -(360*rotateNums)-offset - this.turnTableConfig.imgOffset
			}else{
				angel = (360*rotateNums)+offset + this.turnTableConfig.imgOffset
			}
			let cssObj = {'-webkit-transform':'rotate('+angel+'deg)','transform':'rotate('+angel+'deg)'}
			this.$turnTarget.addClass('turntable-transition').css( cssObj );
		},
		excuteCallBackFunc: function(){
			if(null !== this.turnTableConfig.callBackFunc){
            	this.turnTableConfig.callBackFunc( this.requestSuccMsg );
            }
		},
        getRandom:  function(start, end){
            return Math.round(Math.random()* (end - start) + start)
        }
	},

	events: {
	   'turntable-msg': function () {
			// 兼容下，开启大转盘按钮不在此组件情形;
			this.startupDrawbox();
		}
   }
}
</script>


<style>
#turntable-root {
    margin: 2% auto;
    width: 50%;
    padding-top: 50%;
	-webkit-transform:translateZ(0);
	transform:translateZ(0);
}
#turntable-drawbox {
    position: absolute;
	top: 0;
	left: 0;
	bottom: 0%;
    width: 100%;
    height: 100%;
	background-size: 100% 100%;
}
#turntable-drawpoint {
    position: absolute;
    width: 28%;
    top: 31%;
    left: 36.4%;
    height: 34%;
	background-size: 100% 100%;
	z-index: 2;
    -webkit-transform-origin: 50% 60%;
    -ms-transform-origin: 50% 60%;
    -o-transform-origin: 50% 60%;
    -moz-transform-origin: 50% 60%;
    transform-origin: 50% 60%;
	will-change: transform;
}
.turntable-transition{
    -webkit-transition: -webkit-transform 2s ease-in-out;
    transition: transform 2s ease-in-out;
}
#turntable-drawbox {
  -webkit-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
}
</style>
