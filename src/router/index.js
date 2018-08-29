import Vue from "vue";
import Router from "vue-router";
import VueResource from "vue-resource";
import Login from "@/page/login";
import Manage from "@/page/manage";
import Celuelist from "@/page/celuelist";
import Celuedetail from "@/page/celuedetail";
import Celuecheckall from "@/page/celuecheckall";
import Touzilist from "@/page/touzilist";

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Router);

const routes = [{
        path: "/",
        component: Login
    },
    {
        path: "/manage",
        component: Manage,
        children: [{
                path: "/celuelist",
                component: Celuelist,
                // meta: ["策略管理"]
                meta: [{ name: "bitup", routerval: "" }]
            },
            {
                path: "/celuedetail",
                component: Celuedetail,
                // meta: ["策略管理", "策略详情"]
                meta: [{ name: "bitup", routerval: "/celuelist" }, { name: "bitup详情", routerval: "" }]
            },
            {
                path: "/celuecheckall",
                component: Celuecheckall,
                // meta: ["策略管理", "策略详情", "查看所有流水"]
                meta: [{ name: "bitup", routerval: "/celuelist" }, { name: "bitup详情", routerval: "/celuedetail" }, { name: "查看所有流水", routerval: "" }]
            },
            {
                path: "/celuelist_xianji",
                component: Celuelist,
                // meta: ["策略管理"]
                meta: [{ name: "先机", routerval: "" }]
            },
            {
                path: "/celuedetail_xianji",
                component: Celuedetail,
                // meta: ["策略管理", "策略详情"]
                meta: [{ name: "策略管理", routerval: "/celuelist" }, { name: "策略详情", routerval: "" }]
            },
            {
                path: "/celuecheckall_xianji",
                component: Celuecheckall,
                // meta: ["策略管理", "策略详情", "查看所有流水"]
                meta: [{ name: "策略管理", routerval: "/celuelist" }, { name: "策略详情", routerval: "/celuedetail" }, { name: "查看所有流水", routerval: "" }]
            },
            {
                path: "/touzilist",
                component: Touzilist,
                // meta: ["投资管理"]
                meta: [{ name: "投资管理", routerval: "" }]
            }
        ]
    }
];
export default new Router({
    routes
});
