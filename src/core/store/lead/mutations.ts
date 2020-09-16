import {MutationTree} from 'vuex';
import {Lead, LeadDetails, LeadsState} from '@/core/store/lead/types';
// eslint-disable-next-line import/no-cycle
import store from '@/core/store';

export const mutations: MutationTree<LeadsState> = {
    updateLeads(state, payload: {leads: Array<Lead>; active: boolean}) {
        if (payload.active) {
            state.requests_leads = payload.leads;
        } else {
            state.hisory_leads = payload.leads;
        }
    },
    addLead(state, payload: Lead) {
        if (state.requests_leads === undefined) {
            state.requests_leads = [];
        }
        state.requests_leads.unshift(payload);
    },
    updateLeadDetails(state, payload: {id: number; leadDetails: LeadDetails; active: boolean}) {
        let leadArr: Array<Lead>|undefined;
        if (payload.active) {
            leadArr = store.getters['lead/activeLeads'];
        } else {
            leadArr = store.getters['lead/historyLeads'];
        }
        if (leadArr !== undefined) {
            const lead: Lead | undefined = leadArr.find((l: Lead) => l.id === +payload.id);
            if (lead !== undefined) {
                lead.details = payload.leadDetails;
            }
        }
    },
};
