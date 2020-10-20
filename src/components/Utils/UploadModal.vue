<template>
    <v-row justify="center">
        <v-dialog v-model="dialogActivator" max-width="600px" :style="{zIndex: '10'}">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        width="230px"
                >
                    <v-icon>mdi-text-box-plus-outline</v-icon>
                    {{$t('upload_files_modal.btn_show_dialog')}}
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="headline">
                    <span class="headline">{{$t("upload_files_modal.title")}}</span>
                    <v-spacer/>
                    <v-btn icon light @click="dialogActivator = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-file-input
                            v-model="files"
                            color="deep-purple accent-4"
                            :label="$t('upload_files_modal.label')"
                            counter
                            multiple
                            :placeholder="$t('upload_files_modal.description')"
                            prepend-icon="mdi-paperclip"
                            outlined
                            small-chips
                            :show-size="1000"
                    >
                        <template v-slot:selection="{ index, text }">
                            <v-chip
                                    v-if="index < 2"
                                    color="deep-purple accent-4"
                                    dark
                                    label
                                    small
                            >
                                {{ text }}
                            </v-chip>

                                <span
                                        v-else-if="index === 2"
                                        class="overline grey--text text--darken-3 mx-2"
                                >
            +{{ files.length - 2 }} {{$t('upload_files_modal.counter_files')}}
          </span>
                            </template>
                        </v-file-input>

                        <v-layout row wrap v-if="openedAgents.length > 0">
                            <v-flex
                                    xs12
                                    v-for="agent in openedAgents"
                                    :key="agent.id"
                            >
                                <v-checkbox
                                        :value="agent.id"
                                        :label="agent.name"
                                        v-model="agentsSelected"
                                        :hide-details="true"
                                        :style="{
                                                margin: '0 12px'
                                            }"
                                />
                            </v-flex>
                        </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                            :loading="loading2"
                            color="primary"
                            :disabled="loading2"
                            @click="uploadFiles"
                    >{{$t("upload_files_modal.btn_upl")}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '@/core/plugins/i18n';
import {eventEmitter} from '@/main';

export default Vue.extend({
    props: ['leadId', 'openedAgents'],
    data() {
        return {
            loading2: false,
            files: [],
            dialogActivator: false,
            agentsSelected: [],
        };
    },
    methods: {
        uploadFiles() {
            this.loading2 = true;
            const openLeads = [];
            for (let i = 0; i < this.agentsSelected.length; i++) {
                openLeads.push(this.openedAgents[i].open_lead_id);
            }
            console.log(this.files);
            this.$store.dispatch(
                'lead/uploadLeadFiles',
                {id: +this.leadId, files: this.files, agents: this.agentsSelected, openLeads},
            )
                .then((response) => {
                    console.log(response);
                    if (response.status === 'success') {
                        this.dialogActivator = false;
                        this.files = [];
                        this.agentsSelected = [];
                        eventEmitter.$emit('documentsChanged', {
                            alert: true,
                            alertType: 'success',
                            alertText: i18n.t('lead_details_page.alert_upload_success'),
                        });
                    }
                    this.loading2 = false;
                })
                .catch((err) => console.log(err));
        },
    },
});
</script>

<style scoped>

</style>
