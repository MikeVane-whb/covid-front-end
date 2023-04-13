<template>
<!--  background-color="rgb(48,65,86)"-->
  <el-menu
      :default-openeds="['/student/homePage']"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse-transition="false"
      :collapse="isCollapse"
      router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; margin-right: 5px" >
      <b style="color: white" v-show="logoTextShow">疫情管理系统</b>
    </div>
    <el-menu-item index="/student/homePage">
      <template slot="title"><i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-user-solid"></i>
        <span slot="title">个人中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/student/studentInfo"><i class="el-icon-s-custom"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="/student/modifyPassword"><i class="el-icon-key"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-user-solid"></i>
        <span slot="title">疫情管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/student/clock"><i class="el-icon-message-solid"></i>
          <span slot="title">疫情打卡</span>
        </el-menu-item>
        <el-menu-item index="/student/leave"><i class="el-icon-s-promotion"></i>
          <span slot="title">申请出校</span>
        </el-menu-item>
        <el-menu-item index="/student/leaveSituation"><i class="el-icon-s-promotion"></i>
          <span slot="title">申请情况</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/student/grade">
      <template slot="title"><i class="el-icon-s-custom"></i>
        <span slot="title">班级情况</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/student/covidSituation">
      <template slot="title"><i class="el-icon-coin"></i>
        <span slot="title">疫情概况</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/student/covidGoods">
      <template slot="title"><i class="el-icon-s-goods"></i>
        <span slot="title">物资情况</span>
      </template>
    </el-menu-item>
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
  background-image: linear-gradient(to bottom right,#30cfd0,#330867);
}
.el-menu-item:focus{
  background-image: linear-gradient(to bottom right,#f43b47,#453a94);
}
.el-menu-item-group{
  background-image: linear-gradient(to bottom right,#13547a,#80d0c7);
}
.el-menu{
  min-height: 100%;
  overflow-x: hidden;
  background-image: linear-gradient(to bottom right,#13547a,#80d0c7);
}
</style>