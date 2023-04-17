<template>
  <div style="width:100%">
    <h1 style="font-size: 25px; text-align: center; color: beige;background: #66b1ff">学 生 请 假</h1>
    <el-card style="width: 50%; float: left; margin-top: 10px">
      <el-form :model="leaveRecord"
               :rules="leaveRecordRule"
               :value="leaveRecord.district"
               ref="leaveRecord"
               label-width="110px">
        <el-form-item label="学号" prop="stuNumber" size="small"  >
          <el-input v-model="leaveRecord.stuNumber" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username" size="small"  >
          <el-input v-model="leaveRecord.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college" size="small"  >
          <el-input v-model="leaveRecord.college" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="出入校类型" prop="type" size="small">
          <el-select v-model="leaveRecord.type" size="medium">
            <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="外出地点(省市区)" prop="district"  size="small">
          <el-cascader
              size="medium"
              :options="districtOptions"
              ref="cascaderAddress"
              :props="matchProps"
              @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="外出详细地点" prop="destination" size="small" required>
          <el-input v-model="leaveRecord.destination"></el-input>
        </el-form-item>
        <el-form-item label="离校事由" prop="reason" size="small" required>
          <el-input v-model="leaveRecord.reason"></el-input>
        </el-form-item>
        <el-form-item label="出发时间" prop="leaveTime" size="small" required >
          <el-date-picker
              v-model="leaveRecord.leaveTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark" size="small">
          <el-input type="textarea" :rows="2" v-model="leaveRecord.remark" resize="none"></el-input>
        </el-form-item>
        <el-form-item class="change-info-el-from-item" size="medium">
          <el-button type="primary" size="medium" @click="insertHandle('leaveRecord')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="leave-img-el-card">
      <img class="leave-img" src="../../img/leave.png" alt="出行"/>
    </el-card>
    <el-card class="leave-info-el-card">
      <el-descriptions title="请假信息预览" direction="vertical" :column="2" border size="small">
        <el-descriptions-item label="学号">{{leaveRecord.stuNumber}}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{leaveRecord.username}}</el-descriptions-item>
        <el-descriptions-item label="学院">{{leaveRecord.college}}</el-descriptions-item>
        <el-descriptions-item label="出入校类型">{{leaveRecord.type | formatType}}</el-descriptions-item>
        <el-descriptions-item label="外出地点">{{leaveRecord.district}}</el-descriptions-item>
        <el-descriptions-item label="外出详细地点">{{leaveRecord.destination}}</el-descriptions-item>
        <el-descriptions-item label="离校事由">{{leaveRecord.reason}}</el-descriptions-item>
        <el-descriptions-item label="出发时间">{{leaveRecord.leaveTime}}</el-descriptions-item>
        <el-descriptions-item label="备注">{{leaveRecord.remark}}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>

</template>

<script>
import pca from '../../assets/pca-code.json'
import {LeaveSituationInfo} from '../../data/StudentDataDefine'
import request from "@/plugins/axios";
const CurrentURL = '/studentLeave'
export default {
  name: "Leave",
  created() {
    let student = JSON.parse(localStorage.getItem("student"));
    this.leaveRecord.stuNumber = student.stuNumber;
    this.leaveRecord.username = student.username;
    this.leaveRecord.college = student.college;
  },
  filters: {
    formatType(value) {
      if (!value) return '';
      switch (value){
        case '0': return '请假'
        case '1': return '节假日出入校'
        case '2': return '寒暑假出入校'
        default: return ''
      }
    },
  },
  data() {
    return {
      leaveRecord: LeaveSituationInfo.leaveRecord,
      leaveRecordRule: LeaveSituationInfo.leaveRecordRule,
      districtOptions: pca,
      matchProps: {
        value: 'code',
        label: 'name'
      },
      typeOptions:[
        {value:'0',label:'请假'},
        {value:'1',label:'节假日出入校'},
        {value:'2',label:'寒暑假出入校'},
      ]
    }
  },
  methods: {
    // 获取省市区地址级联
    handleChange(e, form, thsAreaCode) {
      thsAreaCode = this.$refs['cascaderAddress'].getCheckedNodes()[0].pathLabels// 注意2： 获取label值
      this.leaveRecord.district = thsAreaCode[0] + thsAreaCode[1] + thsAreaCode[2]
      console.log(this.leaveRecord)
    },
    insertHandle(value){
      this.$refs[value].validate((valid) => {
        if (valid){
          this.$confirm('是否要申请请假', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            request.post(CurrentURL + '/insertRecord', this.leaveRecord).then(res => {
              if (res.code === this.getStatusCode('SUCCESS')) {
                this.$message.success("成功申请");
                this.$router.push('/student/leaveSituation')
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
    }
  },
}
</script>

<style scoped>
.change-info-el-from-item{
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.leave-img-el-card{

}

.leave-img-el-card{
  width: 46%;
  max-width: 100%;
  margin-top: 10px;
  margin-left: 20px;
  float: right
}

.leave-img{
  width: 100%;
  max-width: 100%;
  height: 200px;
}

.leave-info-el-card{
  margin-top: 10px;
  margin-left: 20px;
  float: right;
  width: 46%;
}

</style>