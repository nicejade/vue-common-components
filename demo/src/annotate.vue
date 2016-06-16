<template id="annotate" lang='jade'>
div.annotate
    blockquote.blockquote {{{ blockquoteStr }}}
</template>

<script type="text/javascript">
export default {
	data(){
        return {
        }
    },
    props: ['blockquoteStr'],
}
</script>

<style media="screen">
.blockquote{
    border-left: 8px solid #000;
    padding: 10px 15px;
    background: none repeat scroll 0 0 rgba(102,128,153, .21);
}
</style>
