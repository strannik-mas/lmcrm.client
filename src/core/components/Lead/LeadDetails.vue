<template>
    <v-card
            max-width="600"
            class="mx-auto mt-5"
    >
        <v-list subheader>
            <v-subheader>Agents which bought lead</v-subheader>
            <v-divider :inset="true"></v-divider>
            <template v-for="(agent, index) in agents">
                <v-list-item :key="index">
                    <v-list-item-avatar>
                        <v-img v-if="agent.avatar" :src="agent.avatar"></v-img>
                        <v-icon light large v-else>mdi-account-circle</v-icon>
                    </v-list-item-avatar>

                    <!--<v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>-->

                    <v-list-item-content>
                        <v-list-item-title v-text="agent.name"></v-list-item-title>
                        <!--<v-list-item-subtitle v-text="agent.phone"></v-list-item-subtitle>-->
                    </v-list-item-content>

                    <!--<v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>-->

                    <v-list-item-content>
                        <v-list-item-title v-text="agent.phone"></v-list-item-title>
                    </v-list-item-content>

                    <!--<v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>-->

                    <v-list-item-content>
                        <v-list-item-title v-text="agent.company"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider
                        :key="index"
                        :inset="true"
                ></v-divider>
            </template>
        </v-list>

        <v-card-actions>
            <v-spacer/>
            <v-btn
                    text
                    :to="'/create/lead/' + sphereId + '/' + id"
                    @click="needRegister = true"
            >
                Show lead form
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import {LeadDetails} from '@/core/store/lead/types';

export default Vue.extend({
    props: ['id', 'sphereId'],
    computed: {
        agents() {
            const details: LeadDetails|undefined = this.$store.getters['lead/getLeadDetails'](+this.id);
            if (details !== undefined) {
                return details.agents;
            }
            return [];
        },
    },
});
</script>

<style scoped>

</style>
