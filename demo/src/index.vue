<template id="index" lang='jade'>
    div#app
        div#left-sidebar
            p(class='sidebar-title') {{ widgetsTitle }}
            ul#sidebar-widgets
                li(v-for='item in widgetsComp' class='sidebar-widgets-li')
                    a(class='sidebar-widgets-span' @click="onEntryDemoClick(item)") {{ item }}
            p(class='sidebar-title') {{ modulesTitle }}
            ul#sidebar-modules
                li(v-for='item in modulesComp' class='sidebar-modules-li')
                    a(class='sidebar-modules-span' @click="onEntryDemoClick(item)" ) {{ item }}
    div#components-wraper
        div#components-cont
            <router-view></router-view>
</template>

<script type="text/javascript">
var componentsConfig = require('./../../config/componentsConfig.js')();
export default {
    data () {
        return {
            widgetsComp: componentsConfig.widgets,
            modulesComp: componentsConfig.modules,
            widgetsTitle: "widgetsComponents",
            modulesTitle: "ModulesComponents",
        }
    },
    route:{
		data(transition){
		}
	},
    components: {
        // tvStrongDialog,
        // commonTable,
        // turnTable,
        // countDown,
        // jadeDealKeys,
        // popupToast,
        // fillPhoneDialog,
    },
    methods: {
        onEntryDemoClick: function( param ){
            console.log( param );
            // this.$route.router.go({name: param ,params: { actId: id }})
            this.$route.router.go({name: param})
        }
    }
}
</script>

<style media="screen">
*{margin: 0;padding: 0}
li{list-style: none}
body{background-color: #E6E6E6}
#left-sidebar{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 16%;
    text-align: center;
    background-color: #222222;
}
.sidebar-title{
    font-size: 1.3em;
    color: #ed1941;
    height: 2em;
    line-height: 2;
    background-color: #65c294;
}
#sidebar-widgets, #sidebar-modules{
    width: 100%;
    font-size: 1.1em;
    color: #009ad6;
}
.sidebar-widgets-li, .sidebar-modules-li{
    width: 100%;
    height: 2em;
    line-height: 2;
    display: table;
    border-bottom: 1px dashed rgba(99,99,99,.6);
}
/*-----components-cont-----*/
#components-wraper{
    position: absolute;
    top:0;
    left:16%;
    width: 60%;
    height: 100%;
    background-color: #d3d7d4;
}
#components-cont{
    margin: 0 9.9%;
}
#comp-title{
    text-align: center;
    color: #000;
    text-shadow: 0 1px 1px #fff
}
#hinting-title{
    margin: 2% 0;
    color: #130c0e;
}
.demonstrate-a{
    margin: 2% 0;
    color: #009ad6;
    font-size: 1.3em;
    line-height: 1.3;
    display: inline-block;
}
.ahead{
    position: relative;
    z-index: 12;
}

.common-a{
    margin: 2% 2% 2% 0;
    padding: 1% 3%;
    position: relative;
    color: #24B3D3;
    font-size: 1em;
    line-height: 2;
    background-color: #222222;
    border-radius: 1em;
    text-decoration: none;
}
.noComplete{
    margin: 2% 0;
    background-color: #222222;
    font-size: 2em;
    line-height: 2;
    text-align: center;
    color: #f2f2f2;
}
</style>
