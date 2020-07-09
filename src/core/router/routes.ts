import {RouteConfig} from 'vue-router';
import History from '@/components/History/History.vue';
import Scheduler from '@/components/Scheduler/Scheduler.vue';
import Home from '../components/Home/Home.vue';
import Login from '../components/Auth/Login/Login.vue';
import Registration from '../components/Auth/Registration/Registration.vue';

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
];
