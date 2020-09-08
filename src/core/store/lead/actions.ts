import {ActionTree} from 'vuex';
import {AxiosResponse} from 'axios';
import axios from '@/core/plugins/axios';
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
};
