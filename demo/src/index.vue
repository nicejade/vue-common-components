<template id="index" lang='jade'>
div#app
    div#left-sidebar
        p(class='sidebar-title') {{ widgetsTitle }}
        ul#sidebar-widgets
            li(v-for='item in widgetsComp' class='sidebar-widgets-li')
                a(class='sidebar-widgets-span' id='{{ item }}' @click="onEntryDemoClick(item)") {{ item }}
        p(class='sidebar-title') {{ modulesTitle }}
        ul#sidebar-modules
            li(v-for='item in modulesComp' class='sidebar-modules-li')
                a(class='sidebar-modules-span' id='{{ item }}' @click="onEntryDemoClick(item)" ) {{ item }}
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
            widgetsTitle: "WidgetsComponents",
            modulesTitle: "ModulesComponents",
        }
    },
    route:{
		data(transition){
		}
	},
    components: {
    },
    methods: {
        onEntryDemoClick: function( param ){
            // this.$route.router.go({name: param ,params: { actId: id }})
            this.$route.router.go({name: param})
            var activeId = '#' + param;
            $('#left-sidebar').find('.active').removeClass('active')
            $(activeId).parent().addClass('active')
        }
    }
}
</script>

<style media="screen">
*{margin: 0;padding: 0}
li{list-style: none}
html, body{
    height: 100%;
    background-color: #1C1F2B;
    background: -webkit-gradient(linear,50% 0,50% 100%,from(#888),to(#fff));
    font-family:"lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif
}
#app{
    height: 100%;
    width: 100%;
    min-width: 800px;
    position: relative;
}
#left-sidebar{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    height: 100%;
    width: 300px;
    text-align: center;
    color: #ffffff;
    /*background-color: #2D3143;*/
    background: -webkit-gradient(linear,50% 0,50% 100%,from(#333),to(#999));
    z-index: 1;
}
#sidebar-widgets, #sidebar-modules{
    width: 100%;
    font-size: 1.1em;
    color: #f2f2f2;
    border-top: 1px solid #221D1D;
}
.sidebar-widgets-li, .sidebar-modules-li{
    width: 100%;
    height: 2em;
    line-height: 2;
    display: table;
    /*border-bottom: 1px dashed rgba(99,99,99,.6);*/
    box-shadow: 0 1px 0 #221D1D,0 1px 1px #999;
}
.sidebar-widgets-li.active, .sidebar-modules-li.active,
.sidebar-widgets-li:hover, .sidebar-modules-li:hover{
    background-color: #130c0e;
}
.sidebar-title, .sidebar-widgets-span, .sidebar-modules-span{
    background: transparent;
    font-weight: 600;
    display: inline-block;
    width: 90%;
    text-indent: 15%;
    margin: 0 5%;
    text-align: left;
}
.sidebar-title{
    text-indent: 0%;
    font-size: 1.3em;
    height: 2em;
    line-height: 2;
}
/*-----components-cont-----*/
#components-wraper{
    display: table;
    width: calc(100% - 300px);
    height: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
#components-cont{
    position: relative;
    left: 0px;
    transition: 300ms ease left;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px 100px;
    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow-y: auto;
}
#components-cont::-webkit-scrollbar {
    background: transparent;
}
@media (max-width: 1240px) {
    #components-wraper{
        -webkit-transition:-webkit-transform 250ms ease;
        -moz-transition: -moz-transform 250ms ease;
        -o-transition: -o-transform 250ms ease;
        transition: transform 250ms ease;
        padding-bottom: 20px
    }
}

@media (min-width: 600px) {
    #components-wraper{
        left:300px
    }
}
#comp-title{
    text-align: center;
    color: #f2f2f2;
    font-weight: 500;
    text-shadow: 1px 1px 1px #000;
    margin: 2% 0 5% 0;
}
#comp-title:hover{
    box-reflect: below 1px linear-gradient(transparent,transparent 20%,rgba(216,216,216,.2));
    -webkit-box-reflect: below 1px linear-gradient(transparent,transparent 20%,rgba(216,216,216,.2));
    -moz-box-reflect: below 1px linear-gradient(transparent,transparent 20%,rgba(216,216,216,.2));
}
.hinting-title{
    margin: 2% 0;
    color: #130C0E;
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
    line-height: 3;
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
.comp-area{
    position: relative;
    margin-left: 5%;
}
</style>
