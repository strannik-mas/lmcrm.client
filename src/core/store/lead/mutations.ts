import {MutationTree} from 'vuex';
import {Lead, LeadsState} from '@/core/store/lead/types';

export const mutations: MutationTree<LeadsState> = {
    updateLeads(state, payload: {leads: Array<Lead>; active: boolean}) {
        if (payload.active) {
            state.requests_leads = payload.leads;
        } else {
            state.hisory_leads = payload.leads;
        }
    },
};
