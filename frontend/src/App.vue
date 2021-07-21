<template>
    <router-view />
</template>

<script>
export default {
    name: 'App',
    mounted() {
        console.log(process.env.VUE_APP_API);
        console.log(process.env.VUE_APP_URL);
    }
}
</script>

