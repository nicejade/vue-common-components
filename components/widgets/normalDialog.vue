<template>
<div id="modal-template"  class="dialog wrap" v-if="isShowDlgFlag">
    <div class="normal-dlg-shadow"></div>
    <div id="normal-dlg-body">
        <h1 v-if="isShowTitleFlag">{{{ titleText }}}</h1>
        <a href="javascript:;" class="normal-dlg-close" v-if="isShowCloseXFlag" @click="onCloseClick"></a>
        <section> {{{ bodyText }}} </section>
        <a class="confirm" @click="onConfirmClick">{{ confirmText }}</a>
    </div>
</div>
</template>

<script type="text/javascript">
export default {
    data () {
        return{
            titleText: null,
            bodyText:"初始数据:Null, Jeff Told U",
            confirmText: "确认",
            callBackFunc: null,
            isShowDlgFlag: false,
            isShowTitleFlag: true,
            isShowCloseXFlag: true,
        }
    },
    // props:["dlgMsgObj"],
    methods: {
        showNormalDialog: function(dlgMsgObj){
            if(typeof dlgMsgObj === "string"){
                this.bodyText = dlgMsgObj || this.bodyText;
            }else{
                dlgMsgObj = dlgMsgObj || {};
                this.titleText = dlgMsgObj.titleText || this.titleText;
                this.bodyText = dlgMsgObj.bodyText || this.bodyText;
                this.confirmText = dlgMsgObj.confirmText || this.confirmText;
                this.callBackFunc = dlgMsgObj.callBackFunc || null;
                this.isShowCloseXFlag = dlgMsgObj.isShowCloseXFlag;
                this.isShowTitleFlag = (this.titleText == null) ? false : true;
            }

            this.isShowDlgFlag = true;
        },

        hideNormalDialog: function(){
            this.isShowDlgFlag = false;
        },


        /*-----------------Callback Function--------------------Private Func*/
        onShowDialog: function(dlgMsgObj){
            this.showNormalDialog(dlgMsgObj);
        },

        onCloseClick: function(){
            this.hideNormalDialog();
        },

        onConfirmClick: function(){
            if(this.callBackFunc !== null){
                this.callBackFunc();
            }
            this.hideNormalDialog();
        }
    },
    events: {
        'show-normal-dlg': function (dlgMsgObj) {
            this.showNormalDialog(dlgMsgObj);
        }
    }
}
</script>

<style>
.dialog.wrap, .normal-dlg-shadow{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.normal-dlg-shadow{
    background: rgba(0,0,0,.6);
    z-index: 11;
}
#normal-dlg-body{
    position: absolute;
    top: 20%;
    left: 52%;
    width: 70%;
    z-index: 11;
    text-align: center;
    margin-left: -36%;
    border-radius: .5em;
    background-color: #130c0e;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    color: #4B2B1C;
}
#normal-dlg-body > h1{
    font-size: 1.24em;
    line-height: 2;
    padding: 0;
    font-weight: normal;
    color: #FFF;
    background-size: 100% 100%;
    position: relative;
}
.normal-dlg-close{
    position: absolute;
    right: 3%;
    top: 3%;
    background-size: 100% 100%;
    width: 1.5em;
    height: 1.5em;
}
.normal-dlg-close:before,.normal-dlg-close:after{
    position: absolute;
    width: 141.41%;
}
.normal-dlg-close:before{
    content: '';
    top: 0;
    display: block;
    height: 0;
    border-bottom: 2px solid #fff;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform-origin: left;
}
.normal-dlg-close:after{
    content: '';
    top: 0;
    left: 100%;
    display: block;
    height: 0;
    border-bottom: 2px solid #fff;
    -webkit-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    -webkit-transform-origin: left;
}
#normal-dlg-body > section {
    background-color: #d3d7d4;
    text-align: left;
    padding: 4% 2%;
    font-size: 1em;
    line-height: 1.2em;
    border-radius: .5em;
    width: 87%;
    margin: 0 auto;
    text-align: center;
    margin-top: 4%;
}
#normal-dlg-body .confirm{
    font: 1.2em Microsoft YaHei, sans-serif;
    line-height: 1.69;
    font-weight: bold;
    color: #FFF;
    text-align: center;
    display: inline-block;
    margin: 2% 3% 3%;
    padding: 0 7%;
    height: 2.2em;
    text-decoration: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
    letter-spacing: .2em;
    background-size: 100% 100%;
}
</style>
