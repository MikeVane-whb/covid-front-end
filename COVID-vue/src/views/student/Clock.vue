<template>
  <div class="center-top form-item-border clock-form">
    <el-form :model="clockForm"
             :rules="clockFormRules"
             label-width="100px"
             class="clock-form">
      <h2 style="color: #404c56;text-align: center;margin-top: 20px">学   生   打   卡</h2>
      <el-form-item label="用户名"  prop="studentName" class="form-item-margin">
        <el-input :disabled="true" v-model="clockForm.studentName"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="stuNumber" class="form-item-margin">
        <el-input :disabled="true" v-model="clockForm.stuNumber"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address" class="form-item-margin">
        <el-input v-model="clockForm.address"></el-input>
      </el-form-item>
      <el-form-item label="身体状态" prop="status" class="form-item-margin ">
        <el-select v-model="clockForm.status" placeholder="请选择目前身体状态" class="form-item-width">
          <el-option label="正常" value="0"></el-option>
          <el-option label="疑似" value="1"></el-option>
          <el-option label="确诊" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否接触过疑似或确诊病例" prop="contactCase" class="form-item-margin" >
        <el-select v-model="clockForm.contactCase" placeholder="请选择是否接触过疑似或确诊病例" class="form-item-width" style="margin-top: 15px">
          <el-option label="未接触" value="0"></el-option>
          <el-option label="接触过" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-margin">
        <el-button
            v-text="clockBtnText"
            type="primary"
            @click="uploadClock"
            :disabled="clockBtnAble"
            style="margin-left: 40px; width: 100px; font-size: 14px">
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/plugins/axios";

const CurrentURL = '/student/clock'

export default {
  name: "ClockSituation",
  created() {
    this.loadStudent()
    this.checkIsClocked()
  },
  data(){
    return{
      clockForm:{
        stuNumber: '',
        studentName: '',
        address: '',
        status: '',
        contactCase: ''
      },
      clockFormRules:{
        
      },
      clockBtnText: '打 卡',
      clockBtnAble: false,
    }
  },
  methods:{
    // 加载学生的用户名与学号
    loadStudent(){
      let item = localStorage.getItem('student');
      let student = JSON.parse(item);
      this.clockForm.stuNumber = student.stuNumber
      this.clockForm.studentName = student.username
    },
    // 检查是否已打卡
    checkIsClocked(value){
      request.get(CurrentURL + '/checkClock.do').then(res => {
        // 已打卡
        if (res.code === this.getStatusCode('SUCCESS')){
          this.$message.info('已 打 卡')
          this.clockBtnText = '已 打 卡';
          this.clockBtnAble = true;
          this.clockForm.address = res.data.address
          if (res.data.status === 0){
            this.clockForm.status = '正常'
          }
          else if(res.data.status === 1){
            this.clockForm.status = '疑似'
          }
          else{
            this.clockForm.status = '确诊'
          }
          if (res.data.contactCase === 0){
            this.clockForm.contactCase = '未接触'
          }
          else{
            this.clockForm.contactCase = '接触过'
          }
        }
        // 未打卡
        else if (res.code === this.getStatusCode('NOT_CHECKED')){
          this.clockBtnText = '打 卡';
          this.clockBtnAble = false;
          this.clockForm.address = '';
          this.clockForm.status = '';
          this.clockForm.contactCase = ''
        }
        else{
          this.$message.error(res.msg)
        }
      })
    },
    // 上传打卡
    uploadClock(){
      request.put(CurrentURL + '/insert.do',this.clockForm).then(res =>{
        if (res.code === this.getStatusCode('SUCCESS')){
          this.$message.success('打卡成功')
          this.loadStudent()
          this.checkIsClocked()
        }
        else{
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>

<style scoped>

.clock-form{
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
}

.el-input.is-disabled /deep/ .el-input__inner{
  background-color: #cccccc;
  color: rgba(14, 28, 40, 0.8);
}

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
  margin: 40px;
}

.el-button:disabled{
  color: rgba(14, 28, 40, 0.5);
}
</style>