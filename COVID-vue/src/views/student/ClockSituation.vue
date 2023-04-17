<template>
  <div>
    <el-table :data="clockSituation" border
              :row-class-name="tableRowClassName">
      <el-table-column prop="username" label="姓名" width="80" align="center"/>
      <el-table-column prop="gradeClass" label="班级" width="100" align="center"/>
      <el-table-column prop="stuNumber" label="学号" width="100"  align="center"/>
      <el-table-column prop="address" label="打卡地点" width="200" align="center"/>
      <el-table-column prop="status" label="身体状态" width="100":formatter="formatStatus" align="center"/>
      <el-table-column prop="travelInfo" label="出行信息" align="center" :formatter="formatTravelInfo"/>
      <el-table-column prop="contactCase" label="是否接触过疑似或确诊病例" align="center" :formatter="formatContactCase"/>
      <el-table-column prop="clockTime" label="打卡时间" align="center" :formatter="formatClockTime"/>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {StudentClock} from "@/data/StudentDataDefine";
const CurrentURL = '/student/clock'

import request from "@/plugins/axios";

export default {
  name: "ClockSituation",
  created() {
    this.load();
  },
  data(){
    return{
      clockSituation: [{StudentClock}],
      total: 0,
      pageNum: 1,
      pageSize: 10,
    }
  },
  methods: {
    load() {
      request.get(CurrentURL + '/getClockPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      }).then(res => {
        if (res.code === this.getStatusCode('SUCCESS')) {
          this.clockSituation = res.data.records
          // console.log(res.data.records)
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },// 分页
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },

    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    tableRowClassName({row, column, rowIndex, columnIndex}) {
      // console.log(row)
      switch (row.status) {
        case 0:
          return 'success-row'
        case 1:
          return 'warning-row'
        case 2:
          return 'error-row'
        default:
          return ''
      }
    },
    formatStatus(row,column) {
      if (!row) return ''
      switch (row.status){
        case 0: return '正常'
        case 1: return '疑似'
        case 2: return '确诊'
        default: return ''
      }
    },
    formatContactCase(row,column) {
      if (!row) return ''
      switch (row.contactCase){
        case 0: return '未接触'
        case 1: return '接触过'
        default: return ''
      }
    },
    formatTravelInfo(row,column) {
      if (!row) return '';
      switch (row.travelInfo){
        case 0: return '去过疫情高风险地区'
        case 1: return '没有去过疫情高风险地区'
        default: return ''
      }
    },
    formatClockTime(row,column){
      if (!row) return ''
      // console.log(row.leaveTime)
      const date = new Date(row.clockTime);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
  }
}
</script>

<style scoped>
.el-table /deep/ .error-row {
  background: pink;
}

.el-table /deep/ .warning-row {
  background: lightgoldenrodyellow;
}

.el-table /deep/ .success-row {
  background: #81DBB8;
}
</style>