<template>
    <a class="btn btn-lg bg fw-bold col-12 my-5" role="button" type="submit" @click="test">{{text}}</a>
</template>

<script>
    export default {
        name: 'Button',
        props: ['text'],
    }

</script>