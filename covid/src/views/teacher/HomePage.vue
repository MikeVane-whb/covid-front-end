<template>
  <div class="mainContainer" style="background: #FFFFE0">
    <div class='inform-div'>
      <el-card class="inform-el-card">
        <img src="../../img/校徽.jpg" alt="Bell Icon" style="  width: 100%;height: 200px;">
      </el-card>
      <el-card class="img-el-card">
        <img src="../../img/teacher/defend_covid.png" alt="Image description" style="height: 100px;width: 200px">
        <img src="../../img/teacher/defend_covid.jpg" alt="Image description" style="height: 250px;width: 200px; margin-top: 20px">
      </el-card>
    </div>
    <div>
      <el-card class="person-info-el-card">
        <el-descriptions title="基本信息" direction="vertical" :column="2" border size="small">
          <el-descriptions-item label="姓名">{{teacher.username}}</el-descriptions-item>
          <el-descriptions-item label="性别">{{teacher.sex}}</el-descriptions-item>
          <el-descriptions-item label="民族">{{teacher.nation}}</el-descriptions-item>
          <el-descriptions-item label="出生日期">{{teacher.birthday | formatDate}}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{teacher.email}}</el-descriptions-item>
          <el-descriptions-item label="手机">{{teacher.phone}}</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card class="education-info-el-card">
        <el-descriptions title="教育信息" direction="vertical" :column="2" border size="small">
          <el-descriptions-item label="入职日期" :span=2>{{teacher.startDate | formatDate}}</el-descriptions-item>
          <el-descriptions-item label="我的专业" :span=2>{{teacher.major}}</el-descriptions-item>
          <el-descriptions-item label="我的学院" :span=2>{{teacher.college}}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>

  </div>
</template>

<script>

import request from "@/plugins/axios";
import {TeacherInfo} from "@/data/TeacherDataDefine";


const CurrentURL = "/teacher"

export default {
  name: "HomePage",
  created() {
    this.load();
  },
  filters: {
    formatDate(value) {
      if (!value) return ''
      const date = new Date(value)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}-${month}-${day}`
    }
  },
  data() {
    return {
      teacher:TeacherInfo.teacher
    }
  },
  methods:{
    load(){
      request.get(CurrentURL + '/select').then(res => {
        if (res.code === this.getStatusCode('SUCCESS')){
          this.teacher = res.data
          localStorage.setItem('teacher',JSON.stringify(res.data))
        }
        else{
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.inform-div{
  float: right;
  margin-right: 20px;
}
.person-info-el-card{
  float: left;
  margin-right: 20px;
  width: 70%;
  height: 100%;
  background: #F5F5DC;
}
.education-info-el-card{
  float: left;
  margin-right: 20px;
  margin-top: 10px;
  width: 70%;
  height: 100%;
  background: #F5F5DC;
}
.inform-el-card{
  width: 250px;
  height: 230px;
  background: #FFFFE0;
}
.img-el-card{
  margin-top: 20px;
  width: 250px;
  height: 420px;
}
span{
  font-size: 16px;
}

</style>