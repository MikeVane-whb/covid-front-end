<template>
  <el-card class="center-top form-item-border clock-form" style="width: 500px">
    <el-form :model="teacher"
             :rules="teacherRule"
             label-width="100px">
      <h2 style="color: #404c56;text-align: center;margin-top: 20px">个人信息</h2>
      <el-form-item label="姓名"  prop="username" class="form-item-margin">
        <el-input class="disabled-input" v-model="teacher.username"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" class="form-item-margin">
        <el-select v-model="teacher.sex" placeholder="请选择性别" class="form-item-width">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="address" class="form-item-margin">
        <el-input v-model="teacher.email"></el-input>
      </el-form-item>
      <el-form-item label="住址" prop="status" class="form-item-margin ">
        <el-input v-model="teacher.address"></el-input>
      </el-form-item>
      <el-form-item class="form-item-margin">
        <el-button
            type="primary"
            @click="updateHandle"
            style="margin-left: 40px; width: 100px; font-size: 14px">修改
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import request from "@/plugins/axios";

const CurrentURL = "/teacher"

export default {
  name: "ClockSituation",
  created() {
    this.loadInfo();
  },
  data(){
    return{
      teacher:{
        username:'',
        sex: '',
        email:'',
        address: '',
      },
      teacherRule:{
        
      }
    }
  },
  methods:{
    loadInfo(){
      request.get(CurrentURL + '/select.do').then(res => {
        if (res.code === this.getStatusCode('SUCCESS')){
          this.teacher = res.data
          // 更新 header 的名称显示
          let user = localStorage.getItem('user');
          user = JSON.parse(user)
          user.username = res.data.username
          localStorage.setItem('user',JSON.stringify(user))
        }
      })
    },
    updateHandle(){
      request.put(CurrentURL + '/update.do', this.teacher).then(res => {
        if (res.code === this.getStatusCode('SUCCESS')) {
          this.$message.success("修改成功");
          this.loadInfo();
        }
      })
    },
  }
}
</script>

<style scoped>

.center-top {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form-item-width{
  width: 250px;
}

.form-item-border{
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.form-item-margin{
  margin: 30px;
}

</style>