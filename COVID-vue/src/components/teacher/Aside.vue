<template>
  <el-menu
      :default-openeds="['1']" style="min-height: 100%; overflow-x: hidden"
      background-color="rgb(48,65,86)"
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
    <el-menu-item index="/teacher/">
      <template slot="title"><i class="el-icon-s-custom"></i>
        <span slot="title">学生管理</span>
      </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i>
        <span slot="title">疫情管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/teacher/clockSituation"><i class="el-icon-place"></i>
          <span slot="title">学生汇报情况</span>
        </el-menu-item>
        <el-menu-item index="/teacher/studentStatus"><i class="el-icon-user-solid"></i>
          <span slot="title">学生状态</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/teacher/covidSituation">
      <template slot="title"><i class="el-icon-coin"></i>
        <span slot="title">疫情概况</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/teacher/covidGoods">
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

</style>