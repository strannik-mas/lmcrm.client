<template>
    <v-row justify="center">
        <v-dialog v-model="dialogActivator" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        class="atomBtn"
                        dark
                        fixed
                        v-bind="attrs"
                        v-on="on"
                        text
                >
                    <v-icon>mdi-format-list-checks</v-icon>
                    {{$t('main_page.contact_fab')}}
                    <div class="dot"></div>
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="headline">
                    <span>{{$t("main_page.select_sphere_modal_title")}}</span>
                    <v-spacer/>
                    <v-btn icon light @click="dialogActivator = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-list>
                    <template v-for="sphere of spheres">
                        <v-list-item :key="sphere.sphere.id">
                            <v-list-item-content class="text-center">
                                <v-list-item-title>{{sphere.sphere.name}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider
                                :key="sphere.sphere.name"
                        />
                    </template>
                </v-list>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            dialogActivator: false,
            needRegister: false,
        };
    },
    computed: {
        spheres() {
            return this.$store.getters['sphere/getUniversalSpheres'];
        },
    },
});
</script>

<style scoped lang="scss">
    $borderColor: #092160;
    $fontColor: #0c1f51;
    $btnWidth: 10em;
    $topDot: -0.4em;
    $widthDot: 0.8em;
    $dotWidth: $btnWidth * 0.2;
    $trX: $btnWidth - $dotWidth;

    .atomBtn {
        border: .15em solid $borderColor;
        border-radius: 5em;
        color: $fontColor;
        font-weight: bold;
        width: $btnWidth;
        //font-size: 1.3em;
        line-height: 2em;
        margin: 0 auto;
    }

    .dot {
        content: '';
        position: absolute;
        top: $topDot;
        left: -1.2em;
        width: $dotWidth;
        height: 140%;
        border-radius: 100%;
        transition: all 300ms ease;
        display: none;
    }
    .dot:after {
        content: '';
        position: absolute;
        left: calc(50% - .5em);
        top: $topDot;
        height: $widthDot;
        width: $widthDot;
        background: $fontColor;
        border-radius: 1em;
        border: .25em solid white;
        box-shadow: 0 0 .7em white,
        0 0 2em $fontColor;
    }
    .atomBtn .dot,
    .atomBtn:hover .dot,
    .atomBtn:focus .dot {
        animation: atom 2s infinite linear;
        display: block;
    }
    @keyframes atom {
        0% {transform: translateX(0) rotate(0);}
        30%{transform: translateX($trX) rotate(0);}
        50% {transform: translateX($trX) rotate(180deg);}
        80% {transform: translateX(0) rotate(180deg);}
        100% {transform: translateX(0) rotate(360deg);}
    }
</style>
