import Vue from 'vue';
import Router from 'vue-router';
//import Home from './views/Home.vue'
import Layout from './views/Layout/Index.vue';
Vue.use(Router);
/**
 * hidden: boolean              true则在左侧显示
 * name: 'router-name'          路由名称，必填
 * meta: {
 *     title: 'title',          左侧菜单栏标题名称
 *     icon: 'icon-class',      左侧菜单栏的icon
 * }
 */
export const asyncRouterMap = [
    {
        path: '/',
        name: 'dashboard',
        component: Layout,
        hidden: true,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'fa fa-home',
                },
                component: () => import('@/views/Home.vue'),
            }
        ]
    },
    {
        path: '/dataManage',
        name: 'dataManage',
        component: Layout,
        hidden: true,
        meta: {
            title: '数据管理',
            icon: 'fa fa-database',
        },
        redirect: '/tableData',
        children: [
            {
                path: '/tableData',
                name: 'tableData',
                meta: {
                    title: '表格管理',
                    icon: 'fa fa-table',
                },
                component: () => import('@/views/DataManage/TableData.vue'),
            },
            {
                path: '/chartsData',
                name: 'chartsData',
                meta: {
                    title: '图标管理',
                    icon: 'fa fa-bar-chart',
                },
                component: () => import('@/views/DataManage/ChartsData.vue'),
            },
            {
                path: '/formData',
                name: 'formData',
                meta: {
                    title: '表单管理',
                    icon: 'fa fa-file-text-o',
                },
                component: () => import('@/views/DataManage/FormData.vue'),
            }
        ]
    },
    /** Tool **/
    {
        path: '/tool',
        name: 'tool',
        component: Layout,
        hidden: true,
        meta: {
            title: '坦克工具',
            icon: 'fa fa-database',
        },
        redirect: '/tableData',
        children: [
            {
                path: '/bulletEditor',
                name: 'bulletEditor',
                meta: {
                    title: '炮弹编辑',
                    icon: 'fa fa-table',
                },
                component: () => import('@/views/Tool/BulletEditor.vue'),
            },
            {
                path: '/mapEditor',
                name: 'mapEditor',
                meta: {
                    title: '地图编辑',
                    icon: 'fa fa-table',
                },
                component: () => import('@/views/Tool/MapEditor.vue'),
            },
        ]
    },
    {
        path: '/userManage',
        name: 'userManage',
        component: Layout,
        hidden: true,
        redirect: '/accountData',
        children: [
            {
                path: '/accountData',
                name: 'accountData',
                meta: {
                    title: '账户管理',
                    icon: 'fa fa-user-plus',
                },
                component: () => import('@/views/UserManage/AccountData.vue'),
            }
        ]
    },
    {
        path: '/user',
        //name: 'userManage',
        component: Layout,
        hidden: false,
        redirect: '/userInfo',
        children: [
            {
                path: '/userInfo',
                name: 'userInfo',
                meta: {
                    title: '个人中心',
                },
                component: () => import('@/views/UserManage/UserInfo.vue'),
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        hidden: false,
        meta: {
            title: '404',
        },
        component: () => import('@/views/404.vue'),
    },
    {
        path: '/login',
        name: 'login',
        hidden: false,
        meta: {
            title: '系统登录',
        },
        component: () => import("@/views/Login/Login.vue")
    },
    {
        path: '/password',
        name: 'password',
        hidden: false,
        meta: {
            title: '找回密码',
        },
        component: () => import("@/views/Login/Password.vue")
    },
    {
        path: '*',
        redirect: '/404',
    },
];
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: asyncRouterMap
});
/**
 * 全局注册
 * 判断是否登录，若否，则跳转到登录页面
 */
router.beforeEach((to, from, next) => {
    const isLogin = !!localStorage.tsToken;
    if (to.path === '/login' || to.path === '/password') {
        next();
    }
    else {
        isLogin ? next() : next('/login');
    }
});
export default router;
//# sourceMappingURL=router.js.map