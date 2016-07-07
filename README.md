<h2 align="center"> Vue Common Components </h2>

![vue-common-components](http://7xoosr.com1.z0.glb.clouddn.com/vue-common-components.jpg?v1.0)

## Demo and instructions

[Vue Component Desc And Demo](http://nicejade.github.io/jade/vue-jade-components-demo.html#/) | ~~[vue-components-doc@gitbook](https://nicejade.gitbooks.io/vue-components-doc/content/index.html)~~


## Prepare the environment

```
// install/update nodejs (Version 4.0 and above)

git clone https://github.com/nicejade/vue-common-components
cd vue-common-components

//安装npm插件;(PS: 可自行更改 package.json 选择所需安装的插件[gulp系非必须])
npm install

//全局安装 webpack
npm install -g webpack

//运行demo示例（Example Document）
cd demo
webpack -w
```

## Usage by importing components  modules

```js
<template lang='jade'>
    <count-down :time.sync="time" :is-complete-show-hms="isCompleteShowHms" :start.sync="isStartCount"></count-down>
    popup-toast
</template>

<script type="text/javascript">
import countDown from 'countDown'
import popupToast from 'popupToast'

export default {
    data () {
        return {
            isCompleteShowHms: true,
            time: 0,
            isStartCount: false,
        }
    },
    components: {
        countDown,
        popupToast,
    },
    methods: {
        onStartCountClick: function(){
            this.time = 9;
            this.isStartCount = true;
        },

        showPopupToast: function( text ){
            var toastMsg = {
                bodyText: text,
                timer: 2222,           //可不传；默认2000ms
                callBackFunc: null     // 可不传，默认null；
            }
            this.$broadcast('show-popup-toast', toastMsg);
        }
    },
    events: {
        'on-countdown-finish': function (countNum) {
            // callback of countdown finished(countNum)
            this.showPopupToast( "countdown had down; countNum = " + countNum )
        }
    }
}
</script>

<style media="screen">
.count-down-time{
    color: #fe0;
}
</style>
```

## Additional recommendations

* 推荐结合使用 Es6 Jade Sass(webpack配置已支持) 以及 Gulp(处理sftp上传，图片压缩，雪碧图等等等等)
* 推荐使用 Atom / SublimeText3 编辑器([如何优雅地使用Sublime Text](http://www.jeffjade.com/2015/12/15/2015-04-17-toss-sublime-text/), [新编码神器Atom使用纪要](http://www.jeffjade.com/2016/03/03/2016-03-02-how-to-use-atom/));
* 推荐使用 Cmder 命令行工具([Win下必备神器之Cmder](http://www.jeffjade.com/2016/01/13/2016-01-13-windows-software-cmder/))
* 其他推荐：Chrome-Vimmium，搜索神器 Listary，快启利器 Wox等，可参见 [那些所倚靠的利器记载](http://www.jeffjade.com/2016/03/17/2016-03-17-jade-tools/).


>以上内容仅代表编写 README 时之前的经验心得；后续将持续学习，探究，更新。last modify：16-06-17 。
