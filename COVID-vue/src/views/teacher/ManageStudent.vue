<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-input v-model="studentName" style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入名称"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
    </div>

    <div style="margin-bottom: 10px">
      <el-button type="primary" @click="handleInsert()">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
      <el-button type="danger">删除 <i class="el-icon-remove-outline"></i></el-button>
    </div>

    <el-table :data="tableData" border>
      <el-table-column prop="id" label="ID" width="80"/>
      <el-table-column prop="username" label="姓名" width="120"/>
      <el-table-column prop="stuNumber" label="学号" width="120"/>
      <el-table-column prop="sex" label="性别" width="60" align="center"/>
      <el-table-column prop="gradeClass" label="班级" width="100" align="center"/>
      <el-table-column prop="address" label="地址" width="250" align="center"/>
<!--      <el-table-column prop="status" label="身体状态" width="150" align="center"/>-->
<!--      <el-table-column prop="contactCase" label="是否接触过疑似病例" width="150" align="center"/>-->
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button type="success" @click="handleUpdate(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-button type="danger">删除 <i class="el-icon-remove-outline"></i></el-button>
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

    <el-dialog title="添加学生" :visible.sync="dialogTableVisible" width="70">
      <el-select v-model="studentId" placeholder="请选择" @change="changeValue(studentId)" filterable>
        <el-option
            v-for="option in options"
            :key="option.id"
            :label="option.username"
            :value="option.id">
        </el-option>
      </el-select>
      <el-button v-model="studentId" type="primary" @click="addStudent(studentId)" style="margin-left: 10px">添 加</el-button>
      <el-table :data="stuInformation">
        <el-table-column property="id" label="ID" width="150"></el-table-column>
        <el-table-column property="username" label="姓名" width="200"></el-table-column>
        <el-table-column property="stuNumber" label="学号"></el-table-column>
      </el-table>
    </el-dialog>


    <el-dialog title="学生信息" :visible.sync="dialogFormVisible" width="35%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="学生姓名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form.stuNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="学生性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.gradeClass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/plugins/axios";

export default {
  name: "Teacher",
  created() {
    // 请求分页查询
    this.load();
    this.loadStudent();
  },
  data(){
    return{
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      studentName: "",
      dialogFormVisible: false,
      dialogTableVisible: false,
      form: {},
      stuInformation: [],
      options: [],
      studentId: '',
    }
  },
  methods:{
    load(){
      request.get("/teacher/manage/findStuPage.do", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          studentName: this.studentName
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },

    loadStudent() {
      request.get("/teacher/manage/selectStudents.do/5").then(res =>{
        this.options = res.data
      })
    },

    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.load()
    },

    handleCurrentChange(pageNum){
      this.pageNum = pageNum
      this.load()
    },

    handleUpdate(row){
      this.dialogFormVisible = true
      this.form = row
    },

    handleInsert(){
      this.dialogTableVisible = true
    },

    update(){

    },

    changeValue(studentId){
      this.stuInformation = []
      this.stuInformation.push(this.options.find(element => element.id == studentId))
    },

    addStudent(studentId){
      this.$confirm('是否要添加学生信息', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '添加',
        cancelButtonText: '取消'
      }).then(() => {
        request.post("/teacher/manage/addStudent.do",this.studentId).then(res => {
          if(res.code == "200"){
            this.$message({
              type: 'success',
              message: '成功添加'
            });
          }
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel'
              ? '取消操作'
              : '停留在当前页面'
        })
      });
      console.log(studentId)
    }
  },
}
</script>

<style scoped>

</style>