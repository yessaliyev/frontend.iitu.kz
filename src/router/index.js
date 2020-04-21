import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Student from "../views/Student";
import Teacher from "../views/Teacher";
import Admin from "../views/Admin";
import Login from "../views/Login";
import TeacherCourse from "../views/TeacherCourse";
import Attendance from "../views/Attendance";
import Course from "../views/Course";
import auth from "../components/mixins/auth";
import store from "../store/index";

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
    component:Login
  },
  {
    path:'/student',
    name:'Student',
    component: Student,
    beforeEnter(to, from, next) {
       auth.methods.check('student')
           .then(()=>{
             next()
           })
           .catch(()=>{
             next({name:"Home"})
           })
    }
  },
  {
    path:'/teacher',
    name:'Teacher',
    component: Teacher,
    beforeEnter(to, from, next) {
       auth.methods.check('teacher')
           .then(()=>{
             next()
           })
           .catch((e)=>{
             console.log(e)
             next({name:"Home"})
           })
    }

  },

  {
    path:'/admin',
    name:'Admin',
    component: Admin
  },
  {
    path:'/course/:id',
    name:'Course',
    component:Course,
    beforeEnter(to, from, next) {
       auth.methods.check(store.getters.user_role,true)
           .then(()=>{
             next()
           })
           .catch((e)=>{
             console.log(e)
             next({name:"Login"})
           })
    }
  },
  {
    path:'/teacher/course/:id',
    name:'TeacherCourse',
    component:TeacherCourse
  },
  {
    path:'/attendance',
    name:'Attendance',
    component:Attendance
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
