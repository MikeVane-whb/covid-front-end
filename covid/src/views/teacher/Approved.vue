<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-input v-model="studentName" style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入名称"></el-input>
      <el-select popper-class="my-popper-class"
                 v-model="gradeClass"
                 placeholder="请选择"
                 filterable
                 style="margin-left: 10px">
        <el-option
            v-for="option in gradeClasses"
            :key="option.gradeClass"
            :label="option.gradeClass"
            :value="option.gradeClass">
        </el-option>
      </el-select>
      <el-button class="ml-5" type="primary" @click="load" style="margin-left: 10px">搜索 <i class="el-icon-search"></i></el-button>
      <el-button class="ml-5" type="primary" @click="clear">重置 <i class="el-icon-refresh-left"></i></el-button>
    </div>

    <el-table :data="leaveRecord" border
              :row-class-name="tableRowClassName">
      <el-table-column prop="username" label="姓名"  align="center"/>
      <el-table-column prop="status" label="状态"  align="center" :formatter="formatStatus"/>
      <el-table-column prop="gradeClass" label="班级"  align="center"/>
      <el-table-column prop="type" label="申请类型"  :formatter="formatType" align="center"/>
      <el-table-column prop="district" label="外出地区"  align="center" min-width="150"/>
      <el-table-column prop="leaveTime" label="出校时间" align="center" :formatter="formatDate"/>
      <el-table-column label="操作" align="center" min-width="150">
        <template v-slot="scope">
          <el-button type="info" @click="check(scope.row)">查看 <i class="el-icon-edit"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="学生请假申请信息" :visible.sync="leaveInfoVisible" width="40%">
      <el-descriptions class="margin-top" title="请假信息预览" :column="1"  border size="medium">
        <el-descriptions-item label="姓名">{{leaveInfo.username}}</el-descriptions-item>
        <el-descriptions-item label="学号">{{leaveInfo.stuNumber}}</el-descriptions-item>
        <el-descriptions-item label="学院">{{leaveInfo.college}}</el-descriptions-item>
        <el-descriptions-item label="出入校类型">
          <el-tag size="small">{{leaveInfo.type | formatType}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="外出地点">{{leaveInfo.district}}</el-descriptions-item>
        <el-descriptions-item label="外出详细地点">{{leaveInfo.destination}}</el-descriptions-item>
        <el-descriptions-item label="离校事由">{{leaveInfo.reason}}</el-descriptions-item>
        <el-descriptions-item label="出发时间">{{leaveInfo.leaveTime | formatDate}}</el-descriptions-item>
        <el-descriptions-item label="备注">{{leaveInfo.remark}}</el-descriptions-item>
        <el-descriptions-item label="申请时间">{{leaveInfo.createTime | formatDate}}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>

import request from "@/plugins/axios";
import {StudentLeaveInfo} from "@/data/TeacherDataDefine";

const CurrentURL = "/teacher/approved"

export default {
  name: "Approved",
  created() {
    this.load();
    this.loadGrade();
  },
  filters:{
    formatType(value) {
      if (value == null) return '';
      switch (value){
        case 0: return '请假'
        case 1: return '节假日出入校'
        case 2: return '寒暑假出入校'
        default: return ''
      }
    },
    formatDate(value) {
      if (!value) return ''
      const date = new Date(value)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
  },
  data(){
    return{
      leaveRecord:[],
      leaveInfo:StudentLeaveInfo.leaveInfo,
      total: 0,
      pageNum: 1,
      pageSize: 5,
      studentName: '',
      gradeClass: '',
      changeGradeClass: '',
      gradeClasses: [],
      leaveInfoVisible: false,
    }
  },
  methods:{
    load(){
      request.get(CurrentURL + "/getApproved", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          studentName: this.studentName,
          gradeClass: this.gradeClass
        }
      }).then(res => {
        if (res.code === this.getStatusCode('SUCCESS')){
          this.leaveRecord = res.data.records
          this.total = res.data.total
        }
        else {
          this.$message.error(res.msg)
        }
      })
    },
    loadGrade(){
      request.get(CurrentURL + '/getGrade').then(res =>{
        if (res.code === this.getStatusCode('SUCCESS')){
          this.gradeClasses = res.data
        }
        else{
          this.$message.error(res.msg)
        }
      })
    },
    clear(){
      this.gradeClass = '';
      this.studentName = '';
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
    check(value){
      this.leaveInfoVisible = true
      this.leaveInfo = value
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