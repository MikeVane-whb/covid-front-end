<template>
  <div>
    <el-table :data="leaveRecord" border
              :row-class-name="tableRowClassName">
      <el-table-column prop="username" label="姓名"  align="center"/>
      <el-table-column prop="status" label="状态"  :formatter="formatStatus" align="center"/>
      <el-table-column prop="type" label="申请类型"  :formatter="formatType" align="center"/>
      <el-table-column prop="district" label="外出地区"  align="center"/>
      <el-table-column prop="destination" label="外出详细地点"  align="center"/>
      <el-table-column prop="leaveTime" label="出校时间" align="center" :formatter="formatDate"/>
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
import {LeaveSituationInfo} from "@/data/StudentDataDefine";
import request from "@/plugins/axios";
const CurrentURL = '/studentLeave'

export default {
  name: "LeaveSituation",
  created() {
    this.load();
  },
  data(){
    return{
      leaveRecord: [{LeaveSituationInfo}],
      total: 0,
      pageNum: 1,
      pageSize: 10,

    }
  },
  methods:{
    load(){
      request.get(CurrentURL + '/getRecordPage',{params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      }).then(res => {
        if (res.code === this.getStatusCode('SUCCESS')){
          this.leaveRecord = res.data.records
          console.log(res.data.records)
          this.total = res.data.total
        }
        else {
          this.$message.error(res.msg)
        }
      })
    },
    // 分页
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.load()
    },

    handleCurrentChange(pageNum){
      this.pageNum = pageNum
      this.load()
    },
    tableRowClassName({row, column, rowIndex, columnIndex}) {
      // console.log(row)
      switch (row.status){
        case -1: return 'error-row'
        case 0: return 'warning-row'
        case 1: return 'success-row'
        default: return ''
      }
    },
    formatStatus(row,column) {
      if (!row) return '';
      switch (row.status){
        case -1: return '未通过'
        case 0: return '待审核'
        case 1: return '通过'
        default: return ''
      }
    },
    formatType(row,column) {
      if (!row) return '';
      switch (row.type){
        case 0: return '请假'
        case 1: return '节假日出入校'
        case 2: return '寒暑假出入校'
        default: return ''
      }
    },
    formatDate(row,column) {
      if (!row) return ''
      // console.log(row.leaveTime)
      const date = new Date(row.leaveTime);
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
  background: #add8ff;
}
</style>