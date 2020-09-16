import {ActionTree} from 'vuex';
import {AxiosResponse} from 'axios';
import axios, {config} from '@/core/plugins/axios';
import {LeadsState} from '@/core/store/lead/types';
import {RootState} from '../types';

export const actions: ActionTree<LeadsState, RootState> = {
    async setLeads({commit}, payload: {active: boolean; id: number}) {
        commit('clearError', null, {root: true});
        commit('setLoading', true, {root: true});

        const url = 'client/get/leads';

        try {
            await axios.get(url, {params: {id: payload.id, active: payload.active}})
                .then((response: AxiosResponse<any>) => {
                    const data = response && response.data;
                    console.log(data);
                    commit('updateLeads', {leads: data.leads, active: payload.active});
                }, (error) => {
                    console.log(error);
                    if (error.response !== undefined && error.response.data !== undefined) {
                        commit('setError', error.response.data.errors, {root: true});
                    } else {
                        commit('setError', error, {root: true});
                    }
                });
        } catch (error) {
            console.log(error);
            commit('setError', error, {root: true});
        } finally {
            commit('setLoading', false, {root: true});
        }
    },
    async saveLead({commit}, payload): Promise<any> {
        commit('clearError', null, {root: true});
        let resp = null;
        const url = 'sphere/form/data/save';
        config.baseURL = process.env.VUE_APP_API_OLD_URL;

        try {
            await axios.post(url, payload, config).then(response => {
                //handle success
                resp = response && response.data;
                if (resp.status === 'success') {
                    commit('addLead', resp.lead);
                }
            })
                .catch((response) => {
                    commit('setError', response.errors, {root: true});
                    resp = response;
                });
        } catch (error) {
            console.log(error);
            commit('setError', error, {root: true});
        }
        return resp;
    },
    async uploadLeadFiles({commit}, payload: {id: number; files: Array<File>}): Promise<any> {
        commit('clearError', null, {root: true});
        let resp = null;
        const url = 'lead/upload/files';

        try {
            await axios.post(url, payload).then(response => {
                //handle success
                resp = response && response.data;
                if (resp.status === 'success') {
                    console.log(resp);
                }
            })
                .catch((response) => {
                    commit('setError', response.errors, {root: true});
                    resp = response;
                });
        } catch (error) {
            console.log(error);
            commit('setError', error, {root: true});
        }
        return resp;
    },
    async setLeadDetails({commit}, payload: {id: number; active: boolean}): Promise<any> {
        commit('clearError', null, {root: true});
        commit('setLoading', true, {root: true});
        let resp = null;
        const url = 'client/lead/details';

        try {
            await axios.get(url, {params: {id: payload.id, active: payload.active}})
                .then((response: AxiosResponse<any>) => {
                    resp = response && response.data;
                    console.log(resp);
                    if (resp.status === 'success') {
                        commit(
                            'updateLeadDetails',
                            {id: payload.id, leadDetails: resp.leadDetails, active: payload.active},
                        );
                    }
                }, (error) => {
                    console.log(error);
                    if (error.response !== undefined && error.response.data !== undefined) {
                        commit('setError', error.response.data.errors, {root: true});
                    } else {
                        commit('setError', error, {root: true});
                    }
                });
        } catch (error) {
            console.log(error);
            commit('setError', error, {root: true});
        } finally {
            commit('setLoading', false, {root: true});
        }
        return resp;
    },
};
