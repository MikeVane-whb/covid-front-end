<template>
  <div>
    <el-tabs class="label-el-tabs">
      <el-tab-pane label="基本信息">
        <el-form :model="teacher" :rules="teacherRule" ref="teacher" class="teacher-teacher">
          <el-form-item label="我的账户" prop="id" size="small" class="my-form-item" >
            <el-input v-model="teacher.id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="我的姓名" prop="username" size="small" class="my-form-item" >
            <el-input v-model="teacher.username"></el-input>
          </el-form-item>
          <el-form-item label="我的性别" prop="resource" class="my-form-item">
            <el-radio-group v-model="teacher.sex" size="medium">
              <el-radio label="男" border style="margin-right: 10px; width: 80px"></el-radio>
              <el-radio label="女" border style="margin-right: 10px; width: 80px"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="我的民族" prop="nation" size="small" class="my-form-item" >
            <el-input v-model="teacher.nation"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" size="small"  class="my-form-item">
            <el-col :span="11">
              <el-form-item prop="birthday">
                <el-date-picker
                    v-model="teacher.birthday"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="我的邮箱" prop="email" size="small" class="my-form-item" >
            <el-input v-model="teacher.email"></el-input>
          </el-form-item>
          <el-form-item label="我的手机" prop="phone" size="small" class="my-form-item">
            <el-input v-model="teacher.phone" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="change-info-el-from-item" size="medium">
            <el-button type="primary" size="medium" @click="updateHandle('teacher')">修改信息</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="教育信息">
        <el-form :model="teacher" :rules="teacherRule" ref="teacher" class="teacher-teacher">
          <el-form-item label="我的账户" prop="id" size="small" class="my-form-item" >
            <el-input v-model="teacher.id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="我的姓名" prop="username" size="small" class="my-form-item" >
            <el-input v-model="teacher.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="入职日期" size="small" prop="startDate">
            <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="teacher.startDate"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">></el-date-picker>
          </el-form-item>
          <el-form-item label="我的专业" prop="major" size="small" class="my-form-item" >
            <el-input v-model="teacher.major"></el-input>
          </el-form-item>
          <el-form-item label="我的学院" prop="college" size="small" class="my-form-item" >
            <el-input v-model="teacher.college"></el-input>
          </el-form-item>
          <el-form-item class="change-info-el-from-item" size="medium">
            <el-button type="primary" size="medium" @click="updateHandle('teacher')">修改信息</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div>
      <el-card class="person-info-el-card">
        <el-descriptions title="基本信息预览" direction="vertical" :column="2" border size="small">
          <el-descriptions-item label="姓名">{{teacher.username}}</el-descriptions-item>
          <el-descriptions-item label="性别">{{teacher.sex}}</el-descriptions-item>
          <el-descriptions-item label="民族">{{teacher.nation}}</el-descriptions-item>
          <el-descriptions-item label="入职日期">{{teacher.birthday | formatDate}}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{teacher.email}}</el-descriptions-item>
          <el-descriptions-item label="手机">{{teacher.phone}}</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card class="education-info-el-card">
        <el-descriptions title="教育信息预览" direction="vertical" :column="2" border size="small">
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
import {TeacherInfo} from '../../data/TeacherDataDefine'

const CurrentURL = "/teacher"

export default {
  name: "TeacherInfo",
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
  data(){
    return{
      teacher:TeacherInfo.teacher,
      teacherRule: TeacherInfo.teacherRule,
    };
  },
  methods:{
    load(){
      request.get(CurrentURL + '/select').then(res => {
        if (res.code === this.getStatusCode('SUCCESS')){
          this.teacher = res.data
          // 更新 header 的名称显示
          let user = localStorage.getItem('user');
          user = JSON.parse(user)
          user.username = res.data.username
          localStorage.setItem('user',JSON.stringify(user))
          localStorage.setItem('teacher',JSON.stringify(res.data))
        }
        else{
          this.$message.error(res.msg)
        }
      })
    },
    updateHandle(value){
      this.$refs[value].validate((valid) => {
        if (valid){
          this.$confirm('是否要更新老师信息', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '添加',
            cancelButtonText: '取消'
          }).then(() => {
            request.put(CurrentURL + '/update', this.teacher).then(res => {
              if (res.code === this.getStatusCode('SUCCESS')) {
                this.$message.success("修改成功");
                this.load();
              }
              else {
                this.$message.error(res.msg)
              }
            })
          }).catch(action => {
            this.$message({
              type: 'info',
              message: '取消操作'
            })
          });
        }
        else{
          this.$message.error('更新失败')
          return false;
        }
      })
    },
  }
}
</script>

<style scoped>

.label-el-tabs{
  float: left;
  width: 60%;
  height: 100%;
}

.my-form-item /deep/ .el-form-item__label{
  font-size: 15px;
  font-weight: bold;
}

.person-info-el-card{
  float: right;
  margin-right: 20px;
  width: 30%;
  height: 100%;
  background: #F5F5DC;
}
.education-info-el-card{
  float: right;
  margin-right: 20px;
  margin-top: 10px;
  width: 30%;
  height: 100%;
  background: #F5F5DC;
}

.change-info-el-from-item{
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>