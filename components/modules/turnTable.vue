<!--Date: 16-04-18
	Author: jeffjade
	Desc: 大转盘/抽奖等功能模块组件
 -->
 <template lang="jade">
	#turntable-root
		#turntable-drawbox
			div(id="turntable-drawpoint" v-on:click="onDrawboxCallback")
</template>

<!-- <template>
	<div id="turntable-root">
		<div id="turntable-drawbox">
			<div v-on:click="onDrawboxCallback"  id="turntable-drawpoint"></div>
		</div>
	</div>
</template> -->

<script>
export default {
	data(){
		return{
			requestSuccData:{}
		}
	},

	ready(){
		document.getElementById('turntable-drawpoint').addEventListener('webkitTransitionEnd', ()=>{
            setTimeout( ()=>{
            	this.excuteCallBackFunc()
            	$('#turntable-drawpoint').removeClass('turntable-transition').css({'webkitTransform' : 'rotate(0deg)'});
            }, this.turnTableConfig.resumeDelay );
		}, false);
	},

	props:{
		Tools:{
            type: null,
            default: {}
        },
        turnTableConfig:{
        	type: Object,
        	default: function(){
        		return {
        			rewardKinds: 8,
        			resumeDelay: 1000,
        			rotateNums: 3,
        			imgOffset: 22.5,
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
			this.Tools.ajax({"p":"complete","extra":{"keys":"turntable"}}, (succData)=>{
				this.requestSuccData = succData || {};
				let rewardKinds = this.turnTableConfig.rewardKinds
				let rotateNums = this.turnTableConfig.rotateNums

				if( succData.status >= 0 ){
					let offset = (360/rewardKinds)*succData.num
					let tragetAngel = (360*rotateNums)+offset - this.turnTableConfig.imgOffset
					$("#turntable-drawpoint").addClass('turntable-transition').css({ 'webkitTransform':'rotate('+tragetAngel+'deg)' });
				}else{
					this.excuteCallBackFunc()
				}
			})
		},
		excuteCallBackFunc: function(){
			if(null !== this.turnTableConfig.callBackFunc){
				var cdObj = {
					msg: this.requestSuccData.msg,
					name: this.requestSuccData.name || ""
				}
            	this.turnTableConfig.callBackFunc( cdObj );
            }
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
	position: absolute;
	width: 50%;
	height: 78%;
	top: 9%;
	right: 2.5%;
}
#turntable-drawbox {
    width: 83%;
    height: 93%;
	position: absolute;
	top: 0;
	right: 6%;
	bottom: 13.5%;
	background-size: 100% 100%;
}
#turntable-drawpoint {
    width: 16.7%;
    top: 33.66%;
    left: 42.4%;
    height: 23.9%;
	background-size: 100% 100%;
	position: absolute;
	z-index: 2;
	-webkit-transform-origin: 50% 65.1%;
	-ms-transform-origin: 50% 65.1%;
	-o-transform-origin: 50% 65.1%;
	-moz-transform-origin: 50% 65.1%;
	transform-origin: 50% 65.1%;
	will-change: transform;
}
.turntable-transition{
    -webkit-transition: -webkit-transform 2s ease-in-out;
    transition: transform 2s ease-in-out;
}
</style>