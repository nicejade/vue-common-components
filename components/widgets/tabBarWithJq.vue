<template>
  <header>
        <a href="javascript:;" id="tab-bar-back" @click="onBackToIndexClick" v-if="isShowBackBtnFlag"></a>
        <nav>
            <ul id="tab-bar-ul">
                <li v-for="(index,liItem) in tabList" @click="onSwitchSectionClick" class="tab-bar-li" :class="{active:index=='0'}">
                    {{ liItem }}
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    props: ['tabList','isShowBackBtnFlag'],
    data () {
        return {}
    },
    ready(){
    },
    methods:{
        onSwitchSectionClick(e){
            var self = e.currentTarget;
            var i = $(self).index();
            $(self).addClass('active').siblings().removeClass('active');
            $('.content').find('section').eq(i).show().siblings('section').hide(); 
        },

        onBackToIndexClick(){
            var href = window.location.href;
            var index = href.lastIndexOf("#");
            var actRuter = href.substring(index);
            href = href.replace(actRuter , '');
            window.location.href = href;
        }
    }
}
</script>