import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";
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
      {path: "teacherInfo", name: "老师信息", component:() => import('../views/teacher/TeacherInfo.vue')},
      {path: "manage", name: "学生管理", component:() => import('../views/teacher/ManageStudent.vue')},
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
    redirect: '/student/homePage',
    children: [
      {path: 'homePage', name: '首页', component:() => import('../views/student/HomePage')},
      {path: 'studentInfo', name: '个人信息', component:() => import('../views/student/StudentInfo')},
      {path: 'modifyPassword', name: '修改密码', component:() => import('../views/student/ModifyPassword')},
      {path: 'clock', name: '疫情打卡', component:() => import('../views/student/Clock')},
      {path: 'clockSituation', name: '打卡情况', component:() => import('../views/student/ClockSituation')},
      {path: 'leave', name: '申请出校', component:() => import('../views/student/Leave')},
      {path: 'leaveSituation', name: '申请情况', component:() => import('../views/student/LeaveSituation')},
      {path: 'grade', name: '班级情况', component:() => import('../views/student/StudentGrade')}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  localStorage.setItem('currentPathName',to.name)
  store.commit('setPath')
  next()
})

export default router
