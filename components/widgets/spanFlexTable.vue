<!--Desc: 以Span+Li来模拟伸缩Table：高度固定，liHeight=总Height/内容条数;
	Date: 16-04-14~15
	Author: Nicejade
 -->
<template>
	<div id="span-flex-table" v-if="isShowTableFlag">
		<ul>
			<li v-for='liItem in tableList'  class="span-flex-table-li">
				<span v-for='spanList in liItem' class="span-flex-table-span"> {{ spanList }} </span>
			</li>
		</ul>
	</div>
</template>


<script type="text/javascript">
export default {
	data(){
        return {
          	'isShowTableFlag': false
        }
    },
    ready(){
	    this.isShowTableFlag = true
	    this.updateTable( this.tableList )
    },
    props: ['tableList'],
   	watch: {
        tableList: function (newVal, oldVal) {
        	this.updateTable( newVal)
        }
    },
    methods: {
    	updateTable: function(tableInfo){
    		var tableListLen = this.getObjLength( tableInfo )
        	var cssHeight = 100/tableListLen + "%";
        	$('.span-flex-table-li').css( {'height': cssHeight} )
    	},
    	getObjLength: function(obj){
    		if(null === obj || undefined === obj){
    			return 0;
    		}

    		if(undefined === obj.length){
	    		let count = 0
			    for(let key in obj){
			    	count++
			    }
			    return count
			}else{
				return obj['length']
			}
    	}
    },
    events: {
    }
}
</script>

<style lang="sass">
*{padding:0;margin:0;box-sizing:border-box;}
$h30   : 30%;
$h50   : 50%;
$h60   : 60%;
$h70   : 70%;
$h80   : 80%;
$h100  : 100%;
$w100  : 100%;

$pa    : absolute;
$pr    : relative;
$tc    : center;

@mixin flex(){
	display:flex;
	display: -webkit-flex;
	flex-wrap:wrap;
	justify-content:$tc;
	align-items:$tc;
}

#span-flex-table{
	position: $pr;
	width: $h60;
	padding-top: $h30;
	background-color: #999;
	color: #333;
	text-align: $tc;
	&>ul{
		@include flex();
		text-align: $tc;
		position: $pa;
		top: 0%;
		left: 0%;
		width: $w100;
		height: $h100;
		border: 2px solid #000;
		&>li{
			list-style: none;
			width: $w100;
			height: calc(100% / 2);
			display: table;
			&:not(:last-child){
				border-bottom: 1px solid #000;
			}
			&>span{
				/* 子元素设置为表格单元块，方便居中设置 */
				display:table-cell;
				height: $h100;
				vertical-align:middle;
				&:not(:last-child){
					border-right: 1px solid #000;
				}
			}
		}
	}
}
</style>
