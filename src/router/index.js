import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AdminPage from "../views/AdminPage";
import LoginPage from "../views/LoginPage";
import AttendancePage from "../views/AttendancePage";
import CoursePage from "../views/CoursePage";
import auth from "../components/mixins/auth";
import store from "../store/index";
import GroupAttendancePage from "../views/GroupAttendancePage";
import CoursesPage from "../views/CoursesPage";
import NewsPage from "../views/NewsPage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
        beforeEnter(to, from, next) {
            auth.methods.check(store.getters.user_role, true)
                .then(() => {
                    next({name: "HomePage"})

                })
                .catch(() => {
                    // console.log(e)
                    next()
                })
        }
    },
    {
        path: '/courses',
        name: 'CoursesPage',
        component: CoursesPage,
        beforeEnter(to, from, next) {
            auth.methods.check(store.getters.user_role, true)
                .then(() => {
                    next()
                })
                .catch(() => {
                    // console.log(e)
                    next({name: "LoginPage"})
                })
        }
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: AdminPage,
        beforeEnter(to, from, next) {
            auth.methods.check('admin')
                .then(() => {
                    next()
                })
                .catch(() => {
                    // console.log(e)
                    next({name: "LoginPage"})
                })
        }
    },
    {
        path: '/course/:subject_id',
        name: 'CoursePage',
        component: CoursePage,
        beforeEnter(to, from, next) {
            auth.methods.check(store.getters.user_role, true)
                .then(() => {
                    next()
                })
                .catch(() => {
                    // console.log(e)
                    next({name: "LoginPage"})
                })
        }
    },
    {
        path: '/attendance/lesson/:lesson_id',
        name: 'GroupAttendancePage',
        component: GroupAttendancePage,
        beforeEnter(to, from, next) {
            auth.methods.check('teacher')
                .then(() => {
                    next()
                })
                .catch(() => {
                    // console.log(e)
                    next({name: "LoginPage"})
                })
        }
    },
    {
        path: '/attendance/course/:subject_id',
        name: 'AttendancePage',
        component: AttendancePage,
        beforeEnter(to, from, next) {
            auth.methods.check(store.getters.user_role, true)
                .then(() => {
                    next()
                })
                .catch(() => {
                    // console.log()
                    next({name: "LoginPage"})
                })
        }
    },
    {
        path: '/news/:news_id',
        name: 'NewsPage',
        component: NewsPage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
