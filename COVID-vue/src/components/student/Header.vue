<template>
  <div class="header-div">
    <div style="flex: 1; font-size: 20px">
      <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
      <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px; font-size: 16px">
        <el-breadcrumb-item :to="'/student'" style="text-decoration-color: white">首页</el-breadcrumb-item>
        <el-breadcrumb-item >{{currentPathName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-dropdown style="width: 150px; cursor: pointer; text-align: center;">
      <span class="name-span">{{user.username}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown" style="text-align: center" >
        <el-dropdown-item style="width: 100px">
          <router-link class="link-to-info" to="/student/studentInfo">个人信息</router-link>
            </el-dropdown-item>
        <el-dropdown-item >
          <span class="link-to-exit" style="text-decoration: none" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Header",
  props:{
    collapseBtnClass:String,
    collapse:Function,
  },
  computed:{
    currentPathName(){
      return this.$store.state.currentPathName;
    }
  },
  watch:{
    currentPathName(newVal, oldVal){
      console.log(newVal)
    }
  },
  data(){
    return{
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  methods:{
    logout(){
      router.push("/login")
      // 清除浏览器存储的 user
      localStorage.removeItem("user")
      // 清除浏览器存储的 session
      document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      this.$message.success("退出成功")
    }
  }
}
</script>

<style scoped>

.link-to-info{
  text-decoration: none;
  color:#606266
}
.link-to-info:hover{
  color: #409eff;
}
.link-to-exit{
  text-decoration: none;
  color:#606266
}
.link-to-exit:hover{
  color: #409eff;
}
.header-div{
  font-size: 16px;
  line-height: 60px;
  display: flex;
}
.name-span{
  font-size: 16px;
}
</style>