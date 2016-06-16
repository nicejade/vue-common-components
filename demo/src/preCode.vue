<template lang='jade'>
    pre#pre-wrapper(class="brush: js") {{ codeString }}
    hr.carve-line
</template>

<script type="text/javascript">
export default {
    data () {
        return{}
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
    border-left: 2px solid #65c294;
    margin-left: 5%;
}
.carve-line{
    margin: 2.1% 0;
}
</style>
