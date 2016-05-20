<template>
<div id='modal-template'  class='dialog wrap' v-if='isShowDlgFlag'>
    <div class='strong-dlg-shadow'></div>
    <div id='strong-dlg-body' class="dlg-body">
        <h1 v-if='isShowTitleFlag'>{{{ titleText }}}</h1>
        <a href='javascript:;' class='strong-dlg-close' v-if='isShowCloseXFlag' @click='onCloseClick'></a>
        <section> {{{ bodyText }}} </section>
        <ul class='strong-dlg-ul'>
            <li v-for='btnItem in btnsObj' class='strong-dlg-li'>
                <a class='strong-dlg-a dlg-submit-btn' @click='onBtnClick($index)'>
                    {{ btnItem.btnText }}
                </a>
            </li>
        </ul>
    </div>
</div>
</template>

<script type="text/javascript">
export default {
    data () {
        return{
            titleText: null,
            bodyText: null,
            btnsObj: {},
            isShowDlgFlag: false,
            isShowTitleFlag: false,
            isShowCloseXFlag: true,
        }
    },
    methods: {
        showStrongDialog: function(dlgMsgObj){
            dlgMsgObj = dlgMsgObj || {};

            this.titleText = dlgMsgObj.titleText || this.titleText;
            this.bodyText = dlgMsgObj.bodyText || this.bodyText;
            this.btnsObj = dlgMsgObj.btnsObj || {};
            this.closeXCallBack = dlgMsgObj.closeXCallBack || null;

            this.isShowTitleFlag = (this.titleText !== null) ? true : false;
            this.isShowCloseXFlag = dlgMsgObj.isShowCloseXFlag;
            this.isShowDlgFlag = true;
        },

        hideStrongDialog: function(){
            this.isShowDlgFlag = false;
        },

        /*-----------------Callback Function--------------------Private Func*/ 
        onShowDialog: function(dlgMsgObj){
            this.showStrongDialog(dlgMsgObj);
        },

        onCloseClick: function(){
            this.hideStrongDialog();
            if( null !== this.closeXCallBack ){
                this.closeXCallBack()
            }
        },
        onBtnClick: function( index ){
            this.hideStrongDialog();
            this.onCallbackFunc( index );
        },
        onCallbackFunc: function( index ){
            if(this.btnsObj[index].callBackFunc !== null){
               this.btnsObj[index].callBackFunc();
            }
        },
    },
    events: {
        'show-strong-dlg': function (dlgMsgObj) {
            this.showStrongDialog(dlgMsgObj)
        },
        'hide-strong-dlg': function(){
            this.hideStrongDialog()
        }
    }
}
</script>

<style>
.dialog.wrap, .strong-dlg-shadow{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.strong-dlg-shadow{
    background: rgba(0,0,0,.6);
    z-index: 11;
}
#strong-dlg-body{
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
#strong-dlg-body > h1{
    font-size: 1.24em;
    line-height: 2;
    padding: 0;
    font-weight: normal;
    color: #FFF;
    background-size: 100% 100%;
    position: relative;
}
.strong-dlg-close{
    position: absolute;
    right: -1%;
    top: -3%;
    background-size: 100% 100%;
    width: 2.38em;
    height: 2.38em;
}
#strong-dlg-body > section {
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
.strong-dlg-ul{
    width: 100%;
    padding: 0;
    display: -webkit-box; display: -moz-box; display: -webkit-flex; display: flex;
    -webkit-box-align: center;-moz-box-align: center;
    -webkit-align-items: center; align-items: center; -webkit-box-pack: center;
    -webkit-justify-content: center; justify-content: center;
}
.strong-dlg-li{
    list-style: none;
    width: 21%;
    margin: auto 8%;
}
#strong-dlg-body .strong-dlg-a{
    font: 1.2em Microsoft YaHei, sans-serif;
    line-height: 1.69;
    font-weight: bold;
    color: #FFF;
    text-align: center;
    display: inline-block;
    margin: 2% 3% 3%;
    padding: 0 7%;
    width: 100%;
    height: 2em;
    text-decoration: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
    letter-spacing: .2em;
    background-size: 100% 100%;
}
</style>