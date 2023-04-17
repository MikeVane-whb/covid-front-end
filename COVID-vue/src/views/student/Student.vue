<template>
  <el-container style="height: 100vh">
      <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246)">
        <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow"/>
      </el-aside>

      <el-container>
        <el-header style="border-bottom: 1px solid #ccc">
          <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse"/>
        </el-header>

        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

import Aside from "@/components/student/Aside";
import Header from "@/components/student/Header";

export default {
  created() {

  },
  components:{Aside,Header},
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      logoTextShow: true,
      sideWidth: 200,
    }
  },
  methods:{
    collapse(){ // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if(this.isCollapse){
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      }
      else {
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    }
  }
};
</script>

<style scoped>

</style>