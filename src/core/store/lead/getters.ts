import {GetterTree} from 'vuex';
import {Lead, LeadsState} from '@/core/store/lead/types';
import {RootState} from '../types';

export const getters: GetterTree<LeadsState, RootState> = {
    activeLeads(state): Array<Lead>|undefined {
        return state.requests_leads;
    },
    historyLeads(state): Array<Lead>|undefined {
        return state.hisory_leads;
    },
};
