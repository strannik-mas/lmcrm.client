import PhoneRegistration from "*.vue";
<template>
    <v-container>
        <video class="bgvid" playsinline autoplay muted loop preload="auto">
            <source :src="'/video/contact.mp4'" type="video/mp4">
        </video>
        <CircularSpinner v-if="loading"/>
    </v-container>
</template>

<script>
import Common from '@/core/mixins/Common';
import CircularSpinner from '@/core/components/Utils/CircularSpinner.vue';

export default {
    components: {CircularSpinner},
    mixins: [Common],
};
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
        filter: grayscale(10%) blur(2px);
    }
</style>
