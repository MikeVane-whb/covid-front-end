<template>
  <div style="font-size: 12px; line-height: 60px; display: flex">
    <div style="flex: 1; font-size: 20px">
      <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
    </div>

    <el-dropdown style="width: 150px; cursor: pointer; text-align: center">
      <span>{{user.username}}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown" style="text-align: center" >
        <el-dropdown-item style="width: 100px">
          <router-link class="link-to-info" to="/teacher/teacherInfo">个人信息</router-link>
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
  data(){
    return{
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  methods:{
    logout(){
      router.push("/login")
      // 清除浏览器存储的 user
      localStorage.clear()
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
</style>