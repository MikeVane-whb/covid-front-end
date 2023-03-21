<template>
  <div class="center-top form-item-border clock-form">
    <el-form :model="clockForm"
             :rules="clockFormRules"
             label-width="100px"
             class="clock-form">
      <h2 style="color: #404c56;text-align: center;margin-top: 20px">学   生   打   卡</h2>
      <el-form-item label="用户名"  prop="studentName" class="form-item-margin">
        <el-input class="disabled-input" :disabled="true" v-model="clockForm.studentName"></el-input>
      </el-form-item>
      <el-form-item label="学号" prop="stuNumber" class="form-item-margin">
        <el-input :disabled="true" v-model="clockForm.stuNumber"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address" class="form-item-margin">
        <el-input></el-input>
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
          <el-option label="接触过" value="0"></el-option>
          <el-option label="未接触" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item-margin">
        <el-button
            type="primary"
            @click="submitForm('clockForm')"
            style="margin-left: 40px; width: 100px; font-size: 14px">打 卡
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ClockSituation",
  data(){
    return{
      clockForm:{
        id:'',
        studentId: '',
        stuNumber: '',
        studentName: '',
        address: '',
        status: '',
        contactCase: ''
      },
      clockFormRules:{
        
      }
    }
  }
}
</script>

<style scoped>

.clock-form{
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
  /*background: linear-gradient(to bottom, #f2f2f2, #dcdcdc);*/
}

.el-input.is-disabled /deep/ .el-input__inner{
  background-color: #dbddde;
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
</style>