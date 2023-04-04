import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
    //配置默认的路径，默认显示登录页
  { path: "/", redirect: "/login"},
  { path: '/login', meta:false, component: () => import('../views/Login.vue')},
  {
    path: "/teacher",
    name: "老师模块",
    meta: false,
    component:() => import('../views/teacher/Teacher.vue'),
    redirect: "/teacher/manage",
    children: [
      {path: "teacherInfo", name: "TeacherInfo", component:() => import('../views/teacher/TeacherInfo.vue')},
      {path: "manage", name: "Manage", component:() => import('../views/teacher/ManageStudent.vue')},
      {path: "clockSituation", name: "ClockSituation", component:() => import('../views/teacher/ClockSituation.vue')},
      {path: "studentStatus", name: "StudentStatus", component:() => import('../views/teacher/StudentStatus.vue')},
      {path: "covidSituation", name: "CovidSituation", component:() => import('../views/CovidSituation.vue')},
      {path: "covidGoods", name: "CovidGoods", component:() => import('../views/CovidGoods.vue')},
    ]
  },
  {
    path: '/student',
    name: '学生模块',
    meta: false,
    component:() => import('../views/student/Student.vue'),
    redirect: '/student/studentInfo',
    children: [
      {path: 'studentInfo', name: 'StudentInfo', component:() => import('../views/student/StudentInfo')},
      {path: 'clock', name: 'Clock', component:() => import('../views/student/Clock')},
      {path: 'grade', name: 'Grade', component:() => import('../views/student/StudentGrade')}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
