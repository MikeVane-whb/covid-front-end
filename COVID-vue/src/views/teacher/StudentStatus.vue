<template>
  <div>
    <el-select v-model="gradeClass" placeholder="请选择" filterable>
      <el-option
          v-for="(item,key) in options"
          :key="item"
          :label="item"
          :value="item">
      </el-option>
    </el-select>
    <el-button v-model="gradeClass" type="primary" @click="handleGetStudents(gradeClass)" style="margin-left: 10px">查 询</el-button>

    <el-table :data="studentStatus" border style="margin-top: 20px" >
      <el-table-column prop="normal"  label="健康" align="center" />
      <el-table-column prop="suspect" label="疑似" align="center" />
      <el-table-column prop="confirm" label="确诊" align="center" />
      <el-table-column label="查看" align="center" width="300px">
        <template v-slot="scope">
          <el-button type="success" @click="checkClockMsg">正常 <i class="el-icon-success"></i></el-button>
          <el-button type="warning" @click="checkClockMsg">疑似 <i class="el-icon-warning"></i></el-button>
          <el-button type="danger" @click="checkNotClockMsg">确诊 <i class="el-icon-error"></i></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="studentStatus" border style="margin-top: 20px" >
      <el-table-column prop="untouched" label="未接触过疑似或确诊病历" align="center" />
      <el-table-column prop="touched"  label="接触过疑似或确诊病例" align="center" />
      <el-table-column label="查看" align="center" width="300px">
        <template v-slot="scope">
          <el-button type="success" @click="checkClockMsg">未接触 <i class="el-icon-success"></i></el-button>
          <el-button type="warning" @click="checkClockMsg">接触过 <i class="el-icon-warning"></i></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="已打卡学生" :visible.sync="clockFormVisible" width="45%">
      <el-form label-width="80px">
        <el-form-item label="学生姓名">
          <el-input
              class="clock-input"
              type="textarea"
              v-model="clockStudentName"
              :autosize="{ minRows: 3, maxRows: 6}"
              :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="未打卡学生" :visible.sync="notClockFormVisible" width="45%">
      <el-form label-width="80px">
        <el-form-item label="学生姓名">
          <el-input
              class="not-clock-input"
              type="textarea"
              v-model="notClockStudentName"
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

const CurrentURL = "/teacher/clock"

export default {
  name: "StudentStatus",
  mounted () {
    var chartDom1 = document.getElementById('status-div');
    var myChart1 = echarts.init(chartDom1);
    var chartDom2 = document.getElementById('touched-div');
    var myChart2 = echarts.init(chartDom2);
    // 在 echarts 实例中设置选项
    myChart1.setOption(this.studentChart)
    myChart2.setOption(this.studentChart)
  },
  created() {
    // 基于准备好的dom，初始化echarts实例
    this.load()
  },
  data(){
    return{
      options: [],
      gradeClass: '',
      studentStatus: [
          {
            normal:'',
            suspect:'',
            confirm:'',
            untouched:'',
            touched:''
          }
          ],
      studentList: [],
      clockStudentName: '',
      notClockStudentName: '',
      clockFormVisible: false,
      notClockFormVisible: false,
      studentChart :studentStatusOption,
    }
  },
  methods: {
    // 计算学生打卡情况
    solveStudentSummary(value){
      console.log(value)
      // 获取打卡的人数
      let filter = value.filter(item => item.clockTime);
      this.studentSummary[0].count = value.length
      this.studentSummary[0].notClock = value.length - filter.length
      this.studentSummary[0].clock = filter.length
      console.log(this.studentSummary)
    },
    // 填充打卡学生姓名
    fillClockStudentName(data){
      let clockStudent = data.filter(item => item.clockTime);
      clockStudent.forEach(item => this.clockStudentName += ('(' + item.stuNumber + ')' +item.username + '\n'))
      // console.log(clockStudent)
    },
    // 填充未打卡学生姓名
    fillNotClockStudentName(data){
      let clockStudent = data.filter(item => !item.clockTime);
      clockStudent.forEach(item => this.notClockStudentName += ('(' + item.stuNumber + ')' +item.username + '\n') )
    },
    // 更新chart中的信息
    updateStudentChart(){
      console.log(this.gradeClass)
      this.$set(this.studentChart.title,'subtext',this.gradeClass)
      this.$set(this.studentChart.series[0].data[0],'value',this.studentSummary[0].clock)
      this.$set(this.studentChart.series[0].data[1],'value',this.studentSummary[0].notClock)
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      // 在 echarts 实例中设置选项
      myChart.setOption(this.studentChart)
    },
    load(){
      request.get(CurrentURL + '/getGrade.do').then(res => {
        if (res.code === this.getStatusCode('SUCCESS')){
          this.options = res.data
          // console.log(this.options)
        }
      })
    },
    handleGetStudents(value){
      // 清空之前的学生姓名
      this.clockStudentName = ''
      this.notClockStudentName = ''
      request.get(CurrentURL + '/getStudents.do/' + value).then(res =>{
        if (res.code === this.getStatusCode('SUCCESS')){
          this.studentList = res.data
          this.solveStudentSummary(res.data)
          this.fillClockStudentName(res.data)
          this.fillNotClockStudentName(res.data)
          this.updateStudentChart()
          this.$message.success('查询成功')
        }
        else{
          this.$message.error(res.msg)
        }
      })
    },
    checkClockMsg(){
      this.clockFormVisible = true
    },
    checkNotClockMsg(){
      this.notClockFormVisible = true
    }
  }
}
</script>

<style scoped>

.clock-input.is-disabled /deep/ .el-textarea__inner{
  background: #66b1ff;
  color: rgba(255,255,255, 1);
  font-size: 15px;
}

.not-clock-input.is-disabled /deep/ .el-textarea__inner{
  background: #F56C6C;
  color: rgba(255,255,255, 1);
  font-size: 15px;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}




</style>