<template>
    <v-container>
        <video class="bgvid" playsinline autoplay muted loop preload="auto">
            <source :src="'/video/contact.mp4'" type="video/mp4">
            <source :src="'/video/panda.mp4'" type="video/mp4">
        </video>
    </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
    .bgvid {
        margin-top: 56px;
        position: fixed;
        top: 50%;
        left: 50%;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        transform: translateX(-50%) translateY(-50%);
        transition: 1s opacity;
    }
</style>
