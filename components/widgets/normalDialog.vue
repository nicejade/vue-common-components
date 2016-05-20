<template>
<div id="modal-template"  class="dialog wrap" v-if="isShowDlgFlag">
    <div class="nromal-dlg-shadow"></div>
    <div id="nromal-dlg-body">
        <h1 v-if="isShowTitleFlag">{{{ titleText }}}</h1>
        <a href="javascript:;" class="nromal-dlg-close" v-if="isShowCloseXFlag" @click="onCloseClick"></a>
        <section> {{{ bodyText }}} </section>
        <a class="confirm" @click="onConfirmClick">{{ confirmText }}</a>
    </div>
</div>
</template>


<style>
.dialog.wrap, .nromal-dlg-shadow{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.nromal-dlg-shadow{
    background: rgba(0,0,0,.6);
    z-index: 11;
}
#nromal-dlg-body{
    position: absolute;
    top: 20%;
    left: 52%;
    width: 70%;
    z-index: 11;
    text-align: center;
    margin-left: -36%;
    border-radius: .5em;
    background-color: transparent;
    background: #F5D39F;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    color: #4B2B1C;
}
#nromal-dlg-body > h1{
    font-size: 1.24em;
    line-height: 2;
    padding: 0;
    font-weight: normal;
    color: #FFF;
    background-size: 100% 100%;
    position: relative;
}
.nromal-dlg-close{
    position: absolute;
    right: -1%;
    top: -3%;
    background-size: 100% 100%;
    width: 2.38em;
    height: 2.38em;
}
#nromal-dlg-body > section {
    background-color: #E0AB75;
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
#nromal-dlg-body .confirm{
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


<script type="text/javascript">
export default {
    data () {
        return{
            titleText: "温馨提示",
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
                this.isShowTitleFlag = dlgMsgObj.isShowTitleFlag || null;
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
            this.hideNormalDialog();
            console.log(this.callBackFunc);
            if(this.callBackFunc !== null){
                this.callBackFunc();
            }
        }
    },
    events: {
        'show-normal-dlg': function (dlgMsgObj) {
            this.showNormalDialog(dlgMsgObj);
        }
    }
}
</script>