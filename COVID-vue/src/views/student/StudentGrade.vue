<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-input v-model="studentName" style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入名称"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column prop="id" label="ID" width="200"/>
      <el-table-column prop="username" label="姓名" width="200"/>
      <el-table-column prop="stuNumber" label="学号" width="200"/>
      <el-table-column prop="sex" label="性别" width="150" align="center"/>
      <el-table-column prop="gradeClass" label="班级" width="200" align="center"/>
      <el-table-column prop="address" label="地址" align="center"/>
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

  </div>
</template>

<script>
import request from "@/plugins/axios";

const CurrentURL = "/student/grade"

export default {

  name: "StudentGrade",
  created() {
    // 请求分页查询
    this.load();
  },
  data(){
    return{
      StudentStore: JSON.parse(localStorage.getItem('student')),
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      studentName: "",
      dialogFormVisible: false,
      dialogTableVisible: false,
      options: [],
      student:{
        studentId: ''
      },
    }
  },
  methods:{
    load(){
      request.get(CurrentURL + "/select.do", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          gradeClass: this.StudentStore.gradeClass,
          studentName: this.studentName,
        }
      }).then(res => {
        if (res.code === this.getStatusCode('SUCCESS')){
          this.tableData = res.data.records
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
  },
}
</script>

<style scoped>

</style>