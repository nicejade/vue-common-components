<template lang='jade'>
    pre#pre-wrapper(class="brush: js") {{ codeString }}
    hr
</template>

<script type="text/javascript">
export default {
    data () {
        console.log(1)
        // highlightCode()
    },
    props: {
        codeString:{
            type: String,
            default: ""
        }
    },
    ready(){
    },
    methods: {
    }
}
</script>

<style media="screen">
#pre-wrapper{
    background-color: #2D2D2D;
    border-left: 2px solid #fe0;
}
</style>
