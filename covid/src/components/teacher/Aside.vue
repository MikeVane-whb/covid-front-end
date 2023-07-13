<template>
<!--  background-color="rgb(48,65,86)"-->
  <el-menu
      :default-openeds="['1']"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse-transition="false"
      :collapse="isCollapse"
      router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../../img/校徽.jpg" alt="" style="width: 20px; position: relative; top: 5px; margin-right: 5px" >
      <b class="tag-b" v-show="logoTextShow">疫情管理系统</b>
    </div>
    <el-menu-item index="/teacher/">
      <template slot="title"><i class="el-icon-s-custom"></i>
        <span class="tag-span" slot="title">首页</span>
      </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-user-solid"></i>
        <span slot="title">个人中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/teacher/teacherInfo"><i class="el-icon-s-custom"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="/teacher/modifyPassword"><i class="el-icon-key"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-user-solid"></i>
        <span slot="title">学生管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/teacher/grade"><i class="el-icon-s-custom"></i>
          <span slot="title">班级信息</span>
        </el-menu-item>
        <el-menu-item index="/teacher/student"><i class="el-icon-key"></i>
          <span slot="title">学生信息</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title"><i class="el-icon-menu"></i>
        <span class="tag-span" slot="title">疫情管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/teacher/clockSituation"><i class="el-icon-place"></i>
          <span class="tag-span" slot="title">学生打卡情况</span>
        </el-menu-item>
        <el-menu-item index="/teacher/studentStatus"><i class="el-icon-user-solid"></i>
          <span class="tag-span" slot="title">学生状态</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title"><i class="el-icon-s-promotion"></i>
        <span class="tag-span" slot="title">请假管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/teacher/pendingApproval"><i class="el-icon-s-check"></i>
          <span class="tag-span" slot="title">待审批</span>
        </el-menu-item>
        <el-menu-item index="/teacher/approved"><i class="el-icon-check"></i>
          <span class="tag-span" slot="title">已审批</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title"><i class="el-icon-message-solid"></i>
        <span class="tag-span" slot="title">通知管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/teacher/notice"><i class="el-icon-school"></i>
          <span class="tag-span" slot="title">校内通知</span>
        </el-menu-item>
        <el-menu-item index="/teacher/nationNotice"><i class="el-icon-orange"></i>
          <span class="tag-span" slot="title">国内通知</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
<!--    <el-menu-item index="/teacher/covidSituation">-->
<!--      <template slot="title"><i class="el-icon-coin"></i>-->
<!--        <span class="tag-span" slot="title">疫情概况</span>-->
<!--      </template>-->
<!--    </el-menu-item>-->
<!--    <el-menu-item index="/teacher/covidGoods">-->
<!--      <template slot="title"><i class="el-icon-s-goods"></i>-->
<!--        <span class="tag-span" slot="title">物资情况</span>-->
<!--      </template>-->
<!--    </el-menu-item>-->
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props:{
    isCollapse:Boolean,
    logoTextShow:Boolean
  }
}
</script>

<style scoped>
.el-menu-item:hover, .el-submenu__title:hover{
  background-image: linear-gradient(to bottom right,#3F7B56,#0088A2);
}
.el-menu-item:focus{
  background-image: linear-gradient(to bottom right,#628448,#96B97A);
}
.el-menu-item-group{
  background: #265038
}
.el-menu{
  min-height: 100%;
  overflow-x: hidden;
  background: #265038
}
.tag-span{
  color: white;
}
.tag-b{
  color: white;
}
</style>