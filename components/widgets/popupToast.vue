<template lang="jade">
div(class="popup-toast" id="modal-template"  v-if="isShowToastFlag")
	section
		p {{ bodyText }}
</template>

<style>
.popup-toast {
    position: absolute;
    top: 38%;
    left: 10%;
    width: 78%;
    padding: .5em 0;
    text-align: center;
    font-size: 1.24em;
    color: #fff;
    z-index: 20;
    background-color: #6f599c;
    border-radius: 1em;
    border: 2px solid #6f599c;
}
</style>

<script type="text/javascript">
export default {
    data () {
        return{
            bodyText:"初始数据:NULL!!",
            callBackFunc: null,
            timer: 2000,
            isShowToastFlag: false,
        }
    },
    methods: {
        showPopupToast: function(toastMsg){
            var _That = this;
            this.isShowToastFlag = true;
            this.bodyText = toastMsg.bodyText || "No Right TextMsg @popupToast Copm";
            this.timer = toastMsg.timer || this.timer;
            this.callBackFunc = toastMsg.callBackFunc;

            setTimeout(function(){
                _That.isShowToastFlag = false;
                if(_That.callBackFunc !== null){
                    _That.callBackFunc();
                }
            }, this.timer)
        }
    },
    events: {
        'show-popup-toast': function (toastMsg) {
            this.showPopupToast(toastMsg);
        }
    }
}
</script>
