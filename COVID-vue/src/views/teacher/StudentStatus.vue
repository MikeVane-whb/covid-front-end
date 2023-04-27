<template>
  <div>
    <el-select v-model="gradeClass" placeholder="请选择" filterable>
      <el-option
          v-for="(item,key) in gradeClasses"
          :key="item.gradeClass"
          :label="item.gradeClass"
          :value="item.gradeClass">
      </el-option>
    </el-select>
    <el-button v-model="gradeClass" type="primary" @click="handleGetStudents(gradeClass)" style="margin-left: 10px">查 询</el-button>

    <el-table :data="studentStatus" border style="margin-top: 20px" >
      <el-table-column prop="normal"  label="健康" align="center" />
      <el-table-column prop="suspect" label="疑似" align="center" />
      <el-table-column prop="confirm" label="确诊" align="center" />
      <el-table-column prop="unknown" label="未知" align="center" />
      <el-table-column label="查看" align="center" width="400px">
        <template v-slot="scope">
          <el-button type="success" @click="checkNormal">健康 <i class="el-icon-success"></i></el-button>
          <el-button type="warning" @click="checkSuspect">疑似 <i class="el-icon-warning"></i></el-button>
          <el-button type="danger" @click="checkConfirm">确诊 <i class="el-icon-error"></i></el-button>
          <el-button type="info" @click="checkUnknown">未知 <i class="el-icon-error"></i></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="studentStatus" border style="margin-top: 20px" >
      <el-table-column prop="untouched" label="未接触过疑似或确诊病历" align="center" />
      <el-table-column prop="touched"  label="接触过疑似或确诊病例" align="center" />
      <el-table-column prop="unknown"  label="未知" align="center" />
      <el-table-column label="查看" align="center" width="300px">
        <template v-slot="scope">
          <el-button type="success" @click="checkUntouched">未接触 <i class="el-icon-success"></i></el-button>
          <el-button type="warning" @click="checkTouched">接触过 <i class="el-icon-warning"></i></el-button>
          <el-button type="info" @click="checkUnknown">未知 <i class="el-icon-warning"></i></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="健康状态" :visible.sync="normalFormVisible" width="45%">
      <el-form label-width="80px">
        <el-form-item label="学生姓名">
          <el-input
              class="normal-input"
              type="textarea"
              v-model="normalStudentName"
              :autosize="{ minRows: 3, maxRows: 6}"
              :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="疑似状态" :visible.sync="suspectFormVisible" width="45%">
      <el-form label-width="80px">
        <el-form-item label="学生姓名">
          <el-input
              class="suspect-input"
              type="textarea"
              v-model="suspectStudentName"
              :autosize="{ minRows: 3, maxRows: 6}"
              :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="确诊状态" :visible.sync="confirmFormVisible" width="45%">
      <el-form label-width="80px">
        <el-form-item label="学生姓名">
          <el-input
              class="confirm-input"
              type="textarea"
              v-model="confirmStudentName"
              :autosize="{ minRows: 3, maxRows: 6}"
              :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="未知状态" :visible.sync="unknownFormVisible" width="45%">
      <el-form label-width="80px">
        <el-form-item label="学生姓名">
          <el-input
              class="unknown-input"
              type="textarea"
              v-model="unknownStudentName"
              :autosize="{ minRows: 3, maxRows: 6}"
              :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="未接触状态" :visible.sync="untouchedFormVisible" width="45%">
      <el-form label-width="80px">
        <el-form-item label="学生姓名">
          <el-input
              class="normal-input"
              type="textarea"
              v-model="untouchedStudentName"
              :autosize="{ minRows: 3, maxRows: 6}"
              :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="已接触状态" :visible.sync="touchedFormVisible" width="45%">
      <el-form label-width="80px">
        <el-form-item label="学生姓名">
          <el-input
              class="suspect-input"
              type="textarea"
              v-model="touchedStudentName"
              :autosize="{ minRows: 3, maxRows: 6}"
              :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="card-container">
      <el-card class="box-card" style="width: 400px; margin-top: 30px;">
        <div id="status-div" style="width: 400px; height: 300px;"></div>
      </el-card>
      <el-card class="box-card" style="width: 400px; margin-top: 30px; margin-left: 100px">
        <div id="touched-div" style="width: 400px; height: 300px;"></div>
      </el-card>
    </div>



  </div>


</template>

<script>
import request from "@/plugins/axios";
import * as echarts from "echarts";
import {studentStatusOption} from '../../echarts/StudentEcharts'

const CurrentURL = "/teacher/covidManage"

export default {
  name: "StudentStatus",
  // 监听数据
  watch:{
    studentStatus:{
      // 随着学生状态改变，饼状图跟着改变
      handler(newVal,oldVal){
        this.$set(this.statusChart.title,'subtext',this.gradeClass)
        this.$set(this.statusChart.series[0].data[0],'value',newVal[0].normal)
        this.$set(this.statusChart.series[0].data[1],'value',newVal[0].suspect)
        this.$set(this.statusChart.series[0].data[2],'value',newVal[0].confirm)
        this.$set(this.statusChart.series[0].data[3],'value',newVal[0].unknown)
        this.$set(this.touchChart.title,'subtext',this.gradeClass)
        this.$set(this.touchChart.series[0].data[0],'value',newVal[0].untouched)
        this.$set(this.touchChart.series[0].data[1],'value',newVal[0].touched)
        this.$set(this.touchChart.series[0].data[2],'value',newVal[0].unknown)
        var chartDom1 = document.getElementById('status-div');
        var myChart1 = echarts.init(chartDom1);
        var chartDom2 = document.getElementById('touched-div');
        var myChart2 = echarts.init(chartDom2);
        // 在 echarts 实例中设置选项
        myChart1.setOption(this.statusChart)
        myChart2.setOption(this.touchChart)
      },
      deep:true
    }
  },
  mounted () {
    var chartDom1 = document.getElementById('status-div');
    var myChart1 = echarts.init(chartDom1);
    var chartDom2 = document.getElementById('touched-div');
    var myChart2 = echarts.init(chartDom2);
    // 在 echarts 实例中设置选项
    myChart1.setOption(this.statusChart)
    myChart2.setOption(this.touchChart)
  },
  created() {
    // 基于准备好的dom，初始化echarts实例
    this.load()
  },
  data(){
    return{
      gradeClasses: [],
      gradeClass: '',
      student:[],
      studentStatus: [
          {
            normal:'',
            suspect:'',
            confirm:'',
            unknown:'',
            untouched:'',
            touched:''
          }
          ],
      studentList: [],
      normalStudentName: '',
      suspectStudentName: '',
      confirmStudentName: '',
      unknownStudentName: '',
      touchedStudentName: '',
      untouchedStudentName: '',
      normalFormVisible: false,
      suspectFormVisible: false,
      confirmFormVisible: false,
      unknownFormVisible: false,
      touchedFormVisible: false,
      untouchedFormVisible: false,
      statusChart :studentStatusOption.statusChart,
      touchChart: studentStatusOption.touchChart
    }
  },
  methods: {
    load(){
      request.get(CurrentURL + '/getGrade').then(res => {
        if (res.code === this.getStatusCode('SUCCESS')){
          this.gradeClasses = res.data
          // console.log(this.options)
        }
      })
    },
    // 初始化学生状态
    initStudentStatus(){
      this.studentStatus[0].normal = 0;
      this.studentStatus[0].suspect = 0;
      this.studentStatus[0].confirm = 0;
      this.studentStatus[0].untouched = 0;
      this.studentStatus[0].touched = 0;
      this.studentStatus[0].unknown = 0;
    },
    // 初始化名字列表
    initNames(){
      this.unknownStudentName = ''
      this.normalStudentName = ''
      this.suspectStudentName = ''
      this.confirmStudentName = ''
      this.untouchedStudentName = ''
      this.touchedStudentName = ''
    },
    // 更新学生状态
    updateStudentStatus(student){
      console.log(student)
      if (student == null || student.length === 0){
        this.initStudentStatus()
      }
      student.forEach(item => {
        if (item.status == null) this.studentStatus[0].unknown++
        if (item.status === 0) this.studentStatus[0].normal++
        if (item.status === 1) this.studentStatus[0].suspect++
        if (item.status === 2) this.studentStatus[0].confirm++
        if (item.contactCase === 0) this.studentStatus[0].untouched++
        if (item.contactCase === 1) this.studentStatus[0].touched++
        if (item.travelInfo === 0) this.studentStatus[0].untouched++
        if (item.travelInfo === 1) this.studentStatus[0].touched++
      })
    },
    // 获取打卡的学生
    handleGetStudents(gradeClass){
      this.initStudentStatus()
      this.initNames()
      request.get(CurrentURL + '/getStudents/' + gradeClass).then(res => {
        if (res.code === this.getStatusCode('SUCCESS')){
          this.student = res.data
          this.updateStudentStatus(res.data)
          this.fillStatusTouchNames(res.data)
          this.$message.success("查询成功")
        }
        else{
          this.$message.error("查询失败")
        }
      })
    },
    // 填充学生状态与接触名单
    fillStatusTouchNames(data){
      data.forEach(item => {
        if (item.status == null) this.unknownStudentName += ('(' + item.stuNumber + ')' +item.username + '\n')
        if (item.status == 0) this.normalStudentName += ('(' + item.stuNumber + ')' +item.username + '\n')
        if (item.status == 1) this.suspectStudentName += ('(' + item.stuNumber + ')' +item.username + '\n')
        if (item.status == 2) this.confirmStudentName += ('(' + item.stuNumber + ')' +item.username + '\n')
        if (item.contactCase == 0) this.untouchedStudentName += ('(' + item.stuNumber + ')' +item.username + '\n')
        if (item.contactCase == 1) this.touchedStudentName += ('(' + item.stuNumber + ')' +item.username + '\n')
      })
    },
    checkNormal(){
      this.normalFormVisible = true
    },
    checkSuspect(){
      this.suspectFormVisible = true
    },
    checkConfirm(){
      this.confirmFormVisible = true
    },
    checkUnknown(){
      this.unknownFormVisible = true
    },
    checkTouched(){
      this.touchedFormVisible = true
    },
    checkUntouched(){
      this.untouchedFormVisible = true
    }
  }
}
</script>

<style scoped>

.normal-input.is-disabled /deep/ .el-textarea__inner{
  background: #66b1ff;
  color: rgba(255,255,255, 1);
  font-size: 15px;
}

.suspect-input.is-disabled /deep/ .el-textarea__inner{
  background: #ebb563;
  color: rgba(255,255,255, 1);
  font-size: 15px;
}

.confirm-input.is-disabled /deep/ .el-textarea__inner{
  background: #F56C6C;
  color: rgba(255,255,255, 1);
  font-size: 15px;
}

.unknown-input.is-disabled /deep/ .el-textarea__inner{
  background: #a6a9ad;
  color: rgba(255,255,255, 1);
  font-size: 15px;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}




</style>