<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-input v-model="studentName" style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入名称"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
    </div>

    <div style="margin-bottom: 10px">
      <el-button type="primary" @click="handleInsert()">新增学生 <i class="el-icon-circle-plus-outline"></i></el-button>
      <el-button type="danger">批量删除 <i class="el-icon-remove-outline"></i></el-button>
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
          <el-button type="danger" @click="handleDelete(scope.row)">删除 <i class="el-icon-remove-outline"></i></el-button>
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
      <el-select v-model="student.studentId" placeholder="请选择" @change="changeValue(student.studentId)" filterable>
        <el-option
            v-for="option in options"
            :key="option.id"
            :label="option.username"
            :value="option.id">
        </el-option>
      </el-select>
      <el-button v-model="student.studentId" type="primary" @click="addRelation()" style="margin-left: 10px">添 加</el-button>
      <el-table :data="stuInformation">
        <el-table-column property="id" label="ID" width="150"></el-table-column>
        <el-table-column property="username" label="姓名" width="200"></el-table-column>
        <el-table-column property="stuNumber" label="学号"></el-table-column>
      </el-table>
    </el-dialog>


    <el-dialog title="学生信息" :visible.sync="dialogFormVisible" width="35%">
      <el-form :model="studentForm" label-width="80px">
        <el-form-item label="学生姓名">
          <el-input v-model="studentForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="studentForm.stuNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="studentForm.sex" placeholder="学生性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="studentForm.gradeClass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="studentForm.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateStudent">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/plugins/axios";
import router from "@/router";

const CurrentURL = "/teacher/manage"

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
      studentForm: {},
      stuInformation: [],
      options: [],
      student:{
        studentId: ''
      },
    }
  },
  methods:{
    // 加载当前老师所管理的学生信息
    load(){
      request.get(CurrentURL + "/findStuPage.do", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          studentName: this.studentName
        }
      }).then(res => {
        if(res.code === "1008" || res.code === "1009"){
          this.$message.error(res.msg);
          router.push("/login")
          return
        }
        if (res.code === this.getStatusCode('SUCCESS')){
          this.tableData = res.data.records
          this.total = res.data.total
        }
        else {
          this.$message.error(res.msg)
        }
      })
    },

    // 加载当前老师未管理的学生信息
    loadStudent() {
      request.get(CurrentURL +"/findOtherStu.do").then(res =>{
        if (res.code === this.getStatusCode('SUCCESS')){
          this.options = res.data
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

    // 更新，弹出更新学生信息框
    handleUpdate(row){
      this.dialogFormVisible = true
      this.studentForm = row
    },

    // 删除，删除学生与老师的信息绑定
    handleDelete(row){
      this.$confirm('是否要删除' + row.username + '信息', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        request.delete(CurrentURL + "/deleteRelation.do/" + row.id,{
        }).then(res => {
          if (res.code === this.getStatusCode('SUCCESS')){
            this.$message.success('删除成功')
            this.load();
            this.loadStudent();
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
    },

    // 新增，弹出新增学生信息框
    handleInsert(){
      this.dialogTableVisible = true
    },

    // value 变化
    changeValue(studentId){
      this.stuInformation = []
      this.stuInformation.push(this.options.find(element => element.id == studentId))
    },

    // 新增，绑定学生与老师的关系
    addRelation(){
      if(this.student.studentId == 0){
        this.$message({
          type: 'warning',
          message: '请重新选择学生'
        });
      }
      this.$confirm('是否要添加学生信息', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '添加',
        cancelButtonText: '取消'
      }).then(() => {
        request.post(CurrentURL+"/addRelation.do",this.student).then(res => {
          if(res.code == "200"){
            this.$message({
              type: 'success',
              message: '成功添加'
            });
            this.load();
            this.loadStudent();
            this.stuInformation = []
          }
          else{
            this.$message.error(res.msg);
          }
          this.student.studentId = ''
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: '取消操作'
        })
      });
      // console.log(this.student.studentId)
    },

    // 更新，更新学生信息
    updateStudent(){
      request.put(CurrentURL + "/updateStudent.do",this.studentForm).then(res =>{
        if(res.code == '200'){
          this.$message({
            type: 'success',
            message: '成功编辑'
          });
        }
        else {
          this.$message({
            type: 'success',
            message: '编辑失败'
          });
        }
      })
      this.dialogFormVisible = false
    }
  },
}
</script>

<style scoped>

</style>