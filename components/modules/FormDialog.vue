<template lang="jade">
	div(class='wrap dialog' id='form-dialog' v-if='isShowDlgFlag')
		div#form-dlg-shadow
		div#form-dialog-body.dlg-body
			h1#form-dialog-h1 {{ titleText }}
			section
				div#form-dialog-cont
					label(for='form-dialog-uname') {{{ userName }}}
					input(type='text' maxlength='20' placeholder='{{ namePlaceholder }}' id='form-dialog-uname')
					br
					label(for='form-dialog-phone') {{{ userPhone }}}
					input(type='text' maxlength='12' placeholder='{{ phonePlaceholder }}' id='form-dialog-phone' required='required')
					br
					label(for='form-dialog-address') {{{ userAddress }}}
					input(type='text' placeholder='{{ addressPlaceholder }}' id='form-dialog-address' required='required')
					br
			div#form-dialog-btns
				a(href="javascript:;" class='form-dialog-a form-dialog-left-a dlg-submit-btn' @click='onLeftBtnClick') {{ leftBtnText }}
				a(href="javascript:;" class='form-dialog-a form-dialog-right-a dlg-close-btn' @click='onRightBtnClick') {{ rightBtnText }}
</template>


<script>
export default {
    data(){
        return{
            Tools: {},
            titleText: '用户信息',
            userName: '姓名',
            userPhone: '<b>*</b>电话',
            userAddress: '地址',
            namePlaceholder: '请输入姓名',
            phonePlaceholder: '请输入电话号码',
            addressPlaceholder: '请输入您的地址',
            leftBtnText: '提交',
            rightBtnText: '取消',
            callBackFunc: null,
            isShowDlgFlag: false,
            isExchangeBtnsFunc: false,
            verifyPhoneNumReg: null,
        }
    },
    methods: {
        showFormDialog: function(dlgMsgObj){
            this.Tools = dlgMsgObj.Tools
            this.titleText = dlgMsgObj.titleText || this.titleText
            this.userName = dlgMsgObj.userName || this.userName
            this.userPhone = dlgMsgObj.userPhone || this.userPhone
            this.userAddress = dlgMsgObj.userAddress || this.userAddress
            this.namePlaceholder = dlgMsgObj.namePlaceholder || this.namePlaceholder
            this.phonePlaceholder = dlgMsgObj.phonePlaceholder || this.phonePlaceholder
            this.addressPlaceholder = dlgMsgObj.addressPlaceholder || this.addressPlaceholder
            this.leftBtnText = dlgMsgObj.leftBtnText || this.leftBtnText
            this.rightBtnText = dlgMsgObj.rightBtnText || this.rightBtnText
            this.isExchangeBtnsFunc = dlgMsgObj.isExchangeBtnsFunc || this.isExchangeBtnsFunc

            this.Tools.ajax({"p":"getUserInfo","extra":{}}, (succData)=>{
                var name = succData.name,
                    tel = succData.tel,
                    email = succData.email,
                    addr = succData.addr;

                this.isShowDlgFlag =  true
                
                setTimeout( (succData)=>{
                	if (succData !== "" &&  null !== succData) {
	                    if (name) $("#form-dialog-uname").val(name)
	                    if (tel) $("#form-dialog-phone").val(tel)
	                    if (email) $("#form-dialog-email").val(email)
	                    if (addr) $("#form-dialog-address").val(addr)
	                }
                } ,0)
            })
        },
        hideFormDialog: function(){
        	this.isShowDlgFlag =  false
        },
        submmitFromInfo: function(){
        	var uname = $("#form-dialog-uname").val(),
				tel = $("#form-dialog-phone").val(),
				email = $("#form-dialog-email").val(),
				addr = $("#form-dialog-address").val(),
				$form = $("#form-dialog-cont");

			$("#error-info").remove()
			$("#form-dialog-phone").on("keydown", function() {
				$("#error-info").fadeOut(100)
			})

			var zhReg = /^1[3-8][0-9]{9}$/,  //简体
                thReg = /^08[0-9]{9,10}$/;   //繁体

            var Reg = zhReg;   //默认简体
            if( null !== this.verifyPhoneNumReg ){
                Reg = this.verifyPhoneNumReg
            }

			if (tel == "" || !Reg.test(tel)) {
				$("#form-dialog-phone").val("");
				$form.prepend($("<p id='error-info'/>").html('请重新输入电话号码！').css("color", "#fe0"));
				return;
			} else {
				this.Tools.ajax({
					"p": "setUserInfo",
					"extra": {
						"name": uname,
						"tel": tel,
						"email": email,
						"addr": addr
					}
				}, ( requestMsg )=>{
					this.hideFormDialog()
					if( null !== this.callBackFunc ){
						this.callBackFunc( requestMsg )
					}
				});
			}
        },

        /*-----------------Callback Function--------------------Private Func*/ 
        onLeftBtnClick: function(){
        	if( true === this.isExchangeBtnsFunc){
        		this.hideFormDialog()
        		return
        	}
        	this.submmitFromInfo()
        },
        onRightBtnClick: function(){
        	if( true === this.isExchangeBtnsFunc){
        		this.submmitFromInfo()
        		return
        	}

        	this.hideFormDialog()
        }
    },
    events: {
        'show-form-dlg': function (dlgMsgObj) {
            this.showFormDialog(dlgMsgObj);
        }
    }
}
</script>

<style>
.dialog.wrap, .form-dlg-shadow{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 5;
}
#form-dlg-shadow{
    background: rgba(0,0,0,.6);
    z-index: 11;
    width: 100%;
    height: 100%;
}
#form-dialog-h1 {
    font-size: 1.24em;
    line-height: 2;
    padding: 0;
    font-weight: normal;
    color: #FFF;
    background-size: 100% 100%;
    position: relative;
}
#form-dialog-body{
	position:absolute;
	top: 20%;
	left: 52%;
	width:70%;
	z-index:11;
	text-align: center;
	margin-left:-36%;
	border-radius: .5em;
	background-color:transparent;
	background:#F5D39F;
	box-sizing:border-box;
	-webkit-box-sizing:border-box;
	-moz-box-sizing:border-box;
	color:#4B2B1C;
}
#form-dialog-cont{width:90%;margin:1% auto}
#form-dialog-body>section{
    background-color: #E0AB75;
    text-align: left;
    padding: 4% 2%;
    font-size: 1em;
    line-height: 1.2em;
    box-shadow: 0 1px 1px rgba(200,71,67,.5),inset 0 1px 2px rgba(0,0,0,.35);
    border-radius: .5em;
    width: 87%;
    margin: 0 auto;
    margin-top: 4%;
}
#form-dialog-cont p{text-align: center;}
#form-dialog-cont label{width:18%;
	padding-right:2%;
	text-align:right;
	display:inline-block}
#form-dialog-cont label>b{color:#fe0;vertical-align: middle;}
#form-dialog-cont input{
	width:64%;
	padding:.3em;
	color:#000;
	font-size: 1em;
	margin:1% auto 1% 2%;
	text-align:left;
	display:inline-block;
	outline: none;
	border:none;
	border-radius:.5em;
	box-shadow:inset -1px 1px 6px rgba(0,0,0,.4);
}
.form-dialog-a{
    font: 1.2em Microsoft YaHei, sans-serif;
    line-height: 1.69;
    font-weight: bold;
    color: #FFF;
    text-align: center;
    display: inline-block;
    margin: 2% 4% 2%;
    width: 23%;
    height: 2em;
    text-decoration: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
    letter-spacing: .2em;
    background-size: 100% 100%;
}
</style>