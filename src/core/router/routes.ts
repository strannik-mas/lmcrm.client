import {RouteConfig} from 'vue-router';
import History from '@/components/History.vue';
import Scheduler from '@/components/Scheduler.vue';
import Home from '@/core/components/Home.vue';
import Login from '@/core/components/Auth/Login.vue';
import Registration from '@/core/components/Auth/Registration.vue';
import SphereLeadForm from '@/core/components/SphereLeadForm.vue';

export const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/registration',
        name: 'reg',
        component: Registration,
    },
    {
        path: '/history',
        name: 'history',
        component: History,
    },
    {
        path: '/scheduler',
        name: 'scheduler',
        component: Scheduler,
    },
    {
        path: '/create/lead/:id',
        props: true,
        name: 'lead',
        component: SphereLeadForm,
    },
];
