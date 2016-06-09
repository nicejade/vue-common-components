<!--Desc: 以Span+Li来模拟伸缩Table：高度固定，liHeight=总Height/内容条数;
	Date: 16-04-14~15
	Author: Nicejade
 -->
<template>
	<ul id="span-flex-table" v-if="isShowTableFlag">
		<li v-for='liItem in tableList'  class="span-flex-table-li">
			<span v-for='spanList in liItem' class="span-flex-table-span"> {{ spanList }} </span>
		</li>
	</ul>
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

			var subTableListLen = this.getObjLength( tableInfo[tableListLen-1] )
			var cssWidth = 100/subTableListLen + "%";
			$('.span-flex-table-span').css( {'width': cssWidth} )
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

<style>
*{padding:0;margin:0;box-sizing:border-box;}
#span-flex-table{
	position: $pr;
	width: 60%;
	background-color: #999;
	color: #333;
	text-align: $tc;
	border: 2px solid #000;
}
.span-flex-table-li{
	list-style: none;
	text-align: center;
	width: 100%;
	display: -webkit-flex;
	display: flex;
	align-items: center;
	flex-flow: row wrap;
	-webkit-align-items: center;
	-webkit-flex-flow: row wrap;
	justify-content: space-around;
	-webkit-justify-content: space-around;
}
.span-flex-table-li:not(:last-child){
	border-bottom: 1px solid #000;
}
.sidebar-widgets-span{
	height: $h100;
	flex-grow: 1;
	-webkit-flex-grow: 1;
	vertical-align:middle;
}
.sidebar-widgets-span:not(:last-child){
	border-right: 1px solid #000;
}
</style>
