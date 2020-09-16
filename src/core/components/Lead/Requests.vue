<template>
    <v-container>
        <v-row dense v-if="! loading">
            <v-col cols="12">
                <v-card
                        class="mx-auto request__card"
                        color="#385F73"
                        dark
                        v-for="lead in leads"
                        :key="lead.id"
                >
                    <v-card-title class="headline">Lead from sphere: {{getSphereName(lead.sphere_id)}}</v-card-title>

                    <v-card-subtitle>
                        Request date: {{lead.created_at}}
                    </v-card-subtitle>

                    <v-card-text>
                        <v-chip
                                class="ma-2"
                                color="green"
                                text-color="white"
                        >
                            <v-icon left>mdi-eye</v-icon>
                            {{lead.count_review}}
                        </v-chip>
                        <v-chip
                                class="ma-2"
                                color="blue"
                                text-color="white"
                        >
                            <v-icon left>mdi-handshake-outline</v-icon>
                            {{lead.count_interest}}
                        </v-chip>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                text
                                :to="'/show/lead/' + lead.id + '/' + lead.sphere_id"
                        >Show lead data</v-btn>
                        <UploadModal
                                :leadId="lead.id"
                        />
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <CircularSpinner v-else/>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Common from '@/core/mixins/Common';
import CircularSpinner from '@/core/components/Utils/CircularSpinner.vue';
import {Lead} from '@/core/store/lead/types';
import {SphereArr} from '@/core/store/sphere/types';
import UploadModal from '@/components/Utils/UploadModal.vue';

export default Vue.extend({
    mixins: [Common],
    components: {CircularSpinner, UploadModal},
    methods: {
        getSphereName(id: number): string {
            let sphereName = '';
            const sphereRes: SphereArr|undefined = this.$store.getters['sphere/sphereById'](+id);
            if (sphereRes !== undefined) {
                sphereName = sphereRes.sphere.name;
            }
            return sphereName;
        },
    },
    computed: {
        leads(): Array<Lead>|undefined {
            return this.$store.getters['lead/activeLeads'];
        },
    },
});
</script>

<style scoped lang="scss">
    .request__card {
        margin: 0 8px 12px;
        max-width: 600px;
    }
</style>
