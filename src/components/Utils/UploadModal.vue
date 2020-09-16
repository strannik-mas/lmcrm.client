<template>
    <v-row justify="center">
        <v-dialog v-model="dialogActivator" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                >
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
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                            :loading="loading2"
                            color="primary"
                            :disabled="loading2"
                            @click="uploadFiles"
                    >{{$t("registration.first_step.btn_send")}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: ['leadId'],
    data() {
        return {
            loading2: false,
            files: [],
            dialogActivator: false,
        };
    },
    methods: {
        uploadFiles() {
            this.loading2 = true;
            console.log(this.files);
            this.$store.dispatch('lead/uploadLeadFiles', {id: +this.leadId, files: this.files})
                .then((response) => {
                    console.log(response);
                    this.loading2 = false;
                })
                .catch((err) => console.log(err));
        },
    },
});
</script>

<style scoped>

</style>
