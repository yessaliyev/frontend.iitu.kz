import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from "../views/Admin";
import Login from "../views/Login";
import Attendance from "../views/Attendance";
import Course from "../views/Course";
import auth from "../components/mixins/auth";
import store from "../store/index";
import GroupAttendance from "../views/GroupAttendance";
import Courses from "../views/Courses";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter(to, from, next) {
            auth.methods.check(store.getters.user_role, true)
                .then(() => {
                    next({name: "Home"})

                })
                .catch(() => {
                    // console.log(e)
                    next()
                })
        }
    },
    {
        path: '/courses',
        name: 'Courses',
        component: Courses,
        beforeEnter(to, from, next) {
            auth.methods.check(store.getters.user_role, true)
                .then(() => {
                    next()
                })
                .catch(() => {
                    // console.log(e)
                    next({name: "Login"})
                })
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        beforeEnter(to, from, next) {
            auth.methods.check('admin')
                .then(() => {
                    next()
                })
                .catch(() => {
                    // console.log(e)
                    next({name: "Login"})
                })
        }
    },
    {
        path: '/course/:subject_id',
        name: 'Course',
        component: Course,
        beforeEnter(to, from, next) {
            auth.methods.check(store.getters.user_role, true)
                .then(() => {
                    next()
                })
                .catch(() => {
                    // console.log(e)
                    next({name: "Login"})
                })
        }
    },
    {
        path: '/attendance/lesson/:lesson_id',
        name: 'GroupAttendance',
        component: GroupAttendance,
        beforeEnter(to, from, next) {
            auth.methods.check('teacher')
                .then(() => {
                    next()
                })
                .catch(() => {
                    // console.log(e)
                    next({name: "Login"})
                })
        }
    },
    {
        path: '/attendance/course/:subject_id',
        name: 'Attendance',
        component: Attendance,
        beforeEnter(to, from, next) {
            auth.methods.check(store.getters.user_role, true)
                .then(() => {
                    next()
                })
                .catch(() => {
                    // console.log()
                    next({name: "Login"})
                })
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
