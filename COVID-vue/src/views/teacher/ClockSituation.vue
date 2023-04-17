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

    <el-table :data="studentSummary" border style="margin-top: 20px" >
      <el-table-column prop="count"  label="学生总人数" align="center" />
      <el-table-column prop="notClock" label="未打卡人数" align="center" />
      <el-table-column prop="clock" label="已打卡人数" align="center" />
      <el-table-column label="操作" align="center" width="300px">
        <template v-slot="scope">
          <el-button type="success" @click="checkClockMsg">查看已打卡信息 <i class="el-icon-edit"></i></el-button>
          <el-button type="danger" @click="checkNotClockMsg">查看未打卡信息 <i class="el-icon-apple"></i></el-button>
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

    <div class="card-container" style="margin-top: 30px;">
      <el-card class="box-card" style="width: 700px; ">
        <div id="main" style="width: 700px; height: 400px;"></div>
      </el-card>
    </div>


  </div>


</template>

<script>
import request from "@/plugins/axios";
import * as echarts from "echarts";
import {clockSituationOption} from '../../echarts/StudentEcharts'

const CurrentURL = "/teacher/clock"

export default {
  name: "ClockSituation",
  mounted () {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    // 在 echarts 实例中设置选项
    myChart.setOption(this.studentChart)
  },
  created() {
    this.load()
  },
  data(){
    return{
      options: [],
      gradeClass: '',
      studentSummary: [
          {
            count:'',
            clock:'',
            notClock:'',
          }
          ],
      studentList: [],
      clockStudentName: '',
      notClockStudentName: '',
      clockFormVisible: false,
      notClockFormVisible: false,
      studentChart :clockSituationOption,
    }
  },
  methods: {
    // 计算学生打卡情况
    solveStudentSummary(value){
      // console.log(value)
      // 获取打卡的人数
      let filter = value.filter(item => item.clockTime);
      this.studentSummary[0].count = value.length
      this.studentSummary[0].notClock = value.length - filter.length
      this.studentSummary[0].clock = filter.length
      // console.log(this.studentSummary)
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
      // console.log(this.gradeClass)
      this.$set(this.studentChart.title,'subtext',this.gradeClass)
      this.$set(this.studentChart.series[0].data[0],'value',this.studentSummary[0].clock)
      this.$set(this.studentChart.series[0].data[1],'value',this.studentSummary[0].notClock)
      const chartDom = document.getElementById('main');
      const myChart = echarts.getInstanceByDom(chartDom);
      // 在 echarts 实例中设置选项
      myChart.setOption(this.studentChart)
    },
    load(){
      request.get(CurrentURL + '/getGrade').then(res => {
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
      request.get(CurrentURL + '/getStudents/' + value).then(res =>{
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