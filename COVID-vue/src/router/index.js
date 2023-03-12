import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/student/Index'
import Login from '../views/login.vue'
Vue.use(VueRouter)

const routes = [
    //配置默认的路径，默认显示登录页
  { path: '/login', meta:false, component: () => import('../views/login.vue')},
  {
    path: "/teacher",
    name: "老师模块",
    meta: false,
    component:() => import('../views/teacher/Teacher.vue'),
    redirect: "/teacher/manage",
    children: [
      {path: "manage", name: "Manage", component:() => import('../views/teacher/ManageStudent.vue')},
      {path: "clockSituation", name: "Clock", component:() => import('../views/teacher/ClockSituation.vue')},
      {path: "studentStatus", name: "StudentStatus", component:() => import('../views/teacher/StudentStatus.vue')},
      {path: "covidSituation", name: "CovidSituation", component:() => import('../views/CovidSituation.vue')},
      {path: "covidGoods", name: "CovidGoods", component:() => import('../views/CovidGoods.vue')},
    ]
  },
  {
    path: "/Register",
    name: "测试",
    meta: false,
    component:() => import('../views/register.vue')
  },
  {
    path: "/Index",
    name:"日常防控管理",
    component:Index,
    meta:true,
    children:[
      {
        path:"/RecordManage",
        name:"打卡记录",
        component:() => import('../views/student/RecordManage.vue')
      },
      {
        path:"/AddRecord",
        name:"健康打卡申报",
        component:()=>import('../views/student/AddRecord.vue')
      }
    ]
  },
  {
    path: "/Index",
    name:"异常人员管理",
    component:Index,
    meta:true,
    children:[
      {
        path:"/IdenManage",
        name:"疑似/确诊人员登记",
        component:() => import(/* webpackChunkName: "BlogManage" */ '../views/student/IdenManage.vue')
        //const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
      },
      {
        path:"/IsManage",
        name:"隔离人员登记",
        component:()=>import(/* webpackChunkName:"AddBlog" */ '../views/student/IsManage.vue')
      }
    ]
  },
  {
    path: "/Index",
    name:"防疫物资管理",
    component:Index,
    meta:true,
    children:[{
      path:"/MaterialManage",
      name:"防疫物资查看",
      component:()=>import(/* webpackChunkName:"MaterialManage" */ '../views/student/MaterialManage.vue')
    },{
      path:"/AddMaterial",
      name:"新增防疫物资",
      component:()=>import(/* webpackChunkName:"AddMaterial" */ '../views/student/AddMaterial.vue')
    }
  ]
  },
  {
    path: "/Index",
    name:"疫情概况",
    component:Index,
    meta:true,
    children:[{
      path:"/EChart",
      name:"防疫数据可视化",
      component:()=>import(/* webpackChunkName:"MaterialManage" */ '../views/student/EChart.vue')
    }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
