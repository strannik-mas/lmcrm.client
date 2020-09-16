import {Lead} from '@/core/store/lead/types';
// eslint-disable-next-line import/extensions,import/no-unresolved
import {NavigationGuardNext, Route} from 'vue-router/types/router';
import store from '../store';

export default function (to: Route, from: Route, next: NavigationGuardNext) {
    console.log(from.path);
    let leadArr: Array<Lead>|undefined;
    let isActive = true;
    if (from.path === '/requests') {
        leadArr = store.getters['lead/activeLeads'];
    } else {
        isActive = false;
        leadArr = store.getters['lead/historyLeads'];
    }
    if (leadArr !== undefined) {
        const lead: Lead|undefined = leadArr.find((l: Lead) => l.id === +to.params.id);
        if (lead !== undefined && lead.details === undefined) {
            store.dispatch('lead/setLeadDetails', {id: +to.params.id, active: isActive}).then((resp) => {
                if (resp.status === 'success') {
                    next();
                }
            })
                .catch((err) => console.log(err));
        } else if (lead !== undefined && lead.details !== undefined) {
            next();
        }
    }
}
