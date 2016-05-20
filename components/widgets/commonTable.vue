<!--Desc: 以Ul+Span+Li来模拟Table;
	Date: 16-05-20
	Author: Nicejade
 -->
<template>
	<ul id="common-table-ul" v-if="isShowTableFlag">
		<li v-for='liItem in tableList'  class="common-table-li">
			<span v-for='spanList in liItem' class="common-table-span"> {{ spanList }} </span>
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
        	if( this.getObjLength(newVal) <= 0 ){
        		return;
        	}
        	this.updateTable(newVal)
        }
    },
    methods: {
    	updateTable: function(tableInfo){
    		var tableListLen = this.getObjLength( tableInfo )
        	var cssHeight = (100/tableListLen) + '%'
        	$('.common-table-li').css( {'height': cssHeight} )

        	var subTableListLen = this.getObjLength( tableInfo[ tableListLen-1 ] )
        	var cssWidth = (100/subTableListLen) + '%'
        	$('.common-table-span').css({'width': cssWidth})
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
#common-table-ul{
    background-color: transparent;
    color: #fff;
    font-size: .9em;
    border: 2px solid #9555ec;
    border-radius: .6em;
}
.common-table-li{
    display: table;
}
.common-table-li:first-child{
    font-size: 1em;
    font-weight: bold;
    color: #ff9f40;
}
.common-table-li:not(:last-child){
    border-bottom: 2px solid #9555ec;
}
.common-table-span{
    height: 100%;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}
.common-table-span:not(:last-child){
    border-right: 2px solid #9555ec;
}	
</style>