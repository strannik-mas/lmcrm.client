import {ActionTree} from 'vuex';
import {AxiosResponse} from 'axios';
import axios from '@/core/plugins/axios';
import i18n from '@/core/plugins/i18n';
import {Sphere, SphereState} from './types';
import {RootState} from '../types';

export const actions: ActionTree<SphereState, RootState> = {
    async fetchUniversalSpheres({commit}) {
        commit('clearError', null, {root: true});
        commit('setLoading', true, {root: true});

        const url = `client/get/spheres`;
        const resultSpheres: Array<Sphere> = [];
        try {
            await axios.get(url).then((response: AxiosResponse<any>) => {
                const data = response && response.data;
                console.log(data);
                if (data.status === 'success' && typeof data.spheres !== 'undefined') {
                    commit('spheresLoaded', data.spheres);
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
            throw error;
        } finally {
            commit('setLoading', false, {root: true});
        }
    },
    getSphereAttributes({commit}, payload) {
        console.log(payload);
    },
};
