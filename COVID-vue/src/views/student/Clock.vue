<template>
  <div class="clock-div">
    <el-form :model="clockForm"
             :rules="clockFormRules"
             label-width="100px"
             class="clock-form">
      <h2 style="color: #404c56;text-align: center;margin-top: 20px">学   生   打   卡</h2>
      <el-form-item label="姓名"  prop="username" class="form-item-margin">
        <el-input :disabled="true" v-model="clockForm.username"></el-input>
      </el-form-item>
      <el-form-item label="班级"  prop="gradeClass" class="form-item-margin">
        <el-input :disabled="true" v-model="clockForm.gradeClass"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="stuNumber" class="form-item-margin">
        <el-input :disabled="true" v-model="clockForm.stuNumber"></el-input>
      </el-form-item>
      <el-form-item label="打卡地点" prop="address" class="form-item-margin">
        <el-input v-model="clockForm.address"></el-input>
      </el-form-item>
      <el-form-item label="身体状态" prop="status" class="form-item-margin ">
        <el-select v-model="clockForm.status" placeholder="请选择目前身体状态" class="form-item-width">
          <el-option label="正常" value='0'></el-option>
          <el-option label="疑似" value='1'></el-option>
          <el-option label="确诊" value='2'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出行信息" prop="travelInfo" class="form-item-margin ">
        <el-select v-model="clockForm.travelInfo" placeholder="是否去过疫情高风险地区" class="form-item-width">
          <el-option label="最近去过" value="0"></el-option>
          <el-option label="没有去过" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否接触过疑似或确诊病例" prop="contactCase" class="form-item-margin" >
        <el-select v-model="clockForm.contactCase" placeholder="请选择是否接触过疑似或确诊病例" class="form-item-width" style="margin-top: 15px">
          <el-option label="未接触" value='0'></el-option>
          <el-option label="接触过" value='1'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-margin clock-button-el-from-item">
        <el-button
            v-text="clockBtnText"
            type="primary"
            @click="uploadClock"
            :disabled="clockBtnAble"
            style="width: 100px; font-size: 14px">
        </el-button>
      </el-form-item>
    </el-form>

    <el-card class="clock-info-el-card">
      <el-descriptions title="打卡信息预览" direction="vertical" :column="1" border size="small">
        <el-descriptions-item label="姓名">{{clockForm.username}}</el-descriptions-item>
        <el-descriptions-item label="班级">{{clockForm.gradeClass}}</el-descriptions-item>
        <el-descriptions-item label="学号">{{clockForm.stuNumber}}</el-descriptions-item>
        <el-descriptions-item label="打卡地点">{{clockForm.address}}</el-descriptions-item>
        <el-descriptions-item label="身体状况">{{clockForm.status | formatStatus}}</el-descriptions-item>
        <el-descriptions-item label="出行信息">{{clockForm.travelInfo | formatTravelInfo}}</el-descriptions-item>
        <el-descriptions-item label="是否接触过疑似或确诊病例">{{clockForm.contactCase | formatContactCase}}</el-descriptions-item>
      </el-descriptions>
    </el-card>

  </div>
</template>

<script>
import request from "@/plugins/axios";
import {StudentClock} from "@/data/StudentDataDefine";

const CurrentURL = '/student/clock'

export default {
  name: "Clock",
  filters: {
    formatStatus(value) {
      switch (value){
        case '0': return '正常'
        case '1': return '疑似'
        case '2': return '确诊'
        default: return ''
      }
    },
    formatContactCase(value) {
      switch (value){
        case '0': return '未接触'
        case '1': return '接触过'
        default: return ''
      }
    },
    formatTravelInfo(value) {
      if (!value) return '';
      switch (value){
        case '0': return '去过疫情高风险地区'
        case '1': return '没有去过疫情高风险地区'
        default: return ''
      }
    }
  },
  created() {
    this.loadStudent()
    this.checkIsClocked()
  },
  data(){
    return{
      clockForm:StudentClock.clockForm,
      clockFormRules:StudentClock.clockFormRules,
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
      this.clockForm.username = student.username
      this.clockForm.gradeClass = student.gradeClass
    },
    // 检查是否已打卡
    checkIsClocked(value){
      request.get(CurrentURL + '/checkClock').then(res => {
        // 已打卡
        if (res.code === this.getStatusCode('SUCCESS')){
          this.$message.info('已 打 卡')
          this.clockBtnText = '已 打 卡';
          this.clockBtnAble = true;
          this.clockForm = res.data
          this.clockForm.status = this.clockForm.status.toString()
          this.clockForm.contactCase = this.clockForm.contactCase.toString()
          this.clockForm.travelInfo = this.clockForm.travelInfo.toString()
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
      this.clockForm.clockTime = new Date()
      request.put(CurrentURL + '/insert',this.clockForm).then(res =>{
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
  float: left;
  width: 50%;
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
}

.clock-info-el-card{
  float: right;
  width: 48%;
  background-image: linear-gradient(to top, #00AF77 0%, #0094CB 100%);
}

.el-input.is-disabled /deep/ .el-input__inner{
  background-color: #cccccc;
  color: rgba(14, 28, 40, 0.8);
}

.form-item-width{
  width: 250px;
}

.form-item-margin{
  margin: 20px;
}

.form-item-margin /deep/ .el-form-item__label{
  color: black;
}

.el-button:disabled{
  color: rgba(14, 28, 40, 0.5);
}

.clock-button-el-from-item{
  margin-left: 100px;
  display: flow;
  justify-content: center;
  align-self: center;
}

</style>