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

    <div style="margin-bottom: 10px">
      <el-button type="primary" @click="handleInsert">新增学生 <i class="el-icon-circle-plus-outline"></i></el-button>
      <el-button type="danger" @click="handleBatchDelete">批量删除 <i class="el-icon-remove-outline"></i></el-button>
    </div>

    <el-table :data="tableData" border
              @selection-change="handleSelectionChange"
              :default-sort = "{prop: 'gradeClass', order: 'descending'}">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="id" label="ID" width="80"/>
      <el-table-column prop="username" label="姓名" width="120"/>
      <el-table-column prop="stuNumber" label="学号" width="120"/>
      <el-table-column prop="sex" label="性别" width="60" align="center"/>
      <el-table-column prop="gradeClass" label="班级" width="100" align="center" sortable/>
      <el-table-column prop="phone" label="电话" width="100" align="center"/>
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
      <el-select class="my-select" v-model="changeGradeClass" placeholder="请选择" @change="changeValue(student.studentId)" filterable style="margin-left: 10px">
        <el-option
            v-for="option in gradeClasses"
            :key="option.gradeClass"
            :label="option.gradeClass"
            :value="option.gradeClass">
        </el-option>
      </el-select>
      <el-button v-model="student.studentId" type="primary" @click="addRelation()" style="margin-left: 10px">添 加</el-button>
      <el-table :data="stuInformation">
        <el-table-column property="id" label="ID"></el-table-column>
        <el-table-column property="username" label="姓名" width="200"></el-table-column>
        <el-table-column property="stuNumber" label="学号"></el-table-column>
        <el-table-column property="gradeClass" label="班级"></el-table-column>
        <el-table-column property="phone" label="手机"></el-table-column>
      </el-table>
    </el-dialog>


    <el-dialog title="学生信息" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="studentForm" :rules="studentForm" ref="studentForm">
        <el-form-item label="学生姓名" prop="username" size="small" class="my-form-item" >
          <el-input v-model="studentForm.username"></el-input>
        </el-form-item>
        <el-form-item label="学生性别" prop="resource" class="my-form-item">
          <el-radio-group v-model="studentForm.sex" size="medium">
            <el-radio label="男" border style="margin-right: 10px; width: 80px"></el-radio>
            <el-radio label="女" border style="margin-right: 10px; width: 80px"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学生班级" prop="gradeClass" size="small" class="my-form-item" >
          <el-select v-model="studentForm.gradeClass" placeholder="请选择班级" filterable>
            <el-option
                v-for="(item,key) in gradeClasses"
                :key="item.gradeClass"
                :label="item.gradeClass"
                :value="item.gradeClass">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生学号" prop="stuNumber" size="small" class="my-form-item" >
          <el-input v-model="studentForm.stuNumber"></el-input>
        </el-form-item>
        <el-form-item label="学生民族" prop="nation" size="small" class="my-form-item" >
          <el-input v-model="studentForm.nation"></el-input>
        </el-form-item>
        <el-form-item prop="birthday" label="出生日期" size="small"  class="my-form-item">
          <el-date-picker
              v-model="studentForm.birthday"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学生邮箱" prop="email" size="small" class="my-form-item" >
          <el-input v-model="studentForm.email"></el-input>
        </el-form-item>
        <el-form-item label="学生手机" prop="phone" size="small" class="my-form-item">
          <el-input v-model="studentForm.phone" :disabled="true"></el-input>
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
import {StudentInfo} from "@/data/StudentDataDefine";
const CurrentURL = "/teacher/student"

export default {

  name: "Teacher",
  created() {
    // 请求分页查询
    this.load();
    this.loadStudent();
    this.loadGrade();
  },
  data(){
    return{
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      studentName: '',
      gradeClass: '',
      changeGradeClass: '',
      gradeClasses: [],
      dialogFormVisible: false,
      dialogTableVisible: false,
      studentForm: {},
      studentFormRule: StudentInfo.studentRule,
      stuInformation: [],
      options: [],
      student:{
        studentId: ''
      },
      multipleSelection: [],
    }
  },
  methods:{
    // 加载当前老师所管理的学生信息
    load(){
      request.get(CurrentURL + "/findStuPage", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          studentName: this.studentName,
          gradeClass: this.gradeClass
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
    // 清除查询信息
    clear(){
      this.gradeClass = '';
      this.studentName = '';
    },
    // 加载当前老师未管理的学生信息
    loadStudent() {
      request.get(CurrentURL +"/findOtherStu").then(res =>{
        if (res.code === this.getStatusCode('SUCCESS')){
          this.options = res.data
        }
      })
    },
    // 加载老师管理的班级号
    loadGrade(){
      request.get(CurrentURL + '/getGrades').then(res =>{
        if (res.code === this.getStatusCode('SUCCESS')){
          this.gradeClasses = res.data
        }
        else{
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
        request.delete(CurrentURL + "/deleteRelation",{data:row}).then(res => {
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
          message: '请选择学生'
        });
        return
      }
      if(this.changeGradeClass == ''){
        this.$message({
          type: 'warning',
          message: '请选择班级'
        });
        return
      }
      this.$confirm('是否要添加学生信息', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '添加',
        cancelButtonText: '取消'
      }).then(() => {
        // console.log(this.stuInformation)
        request.post(CurrentURL+"/addRelation/"+this.changeGradeClass,this.stuInformation[0]).then(res => {
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
      this.$confirm('是否要修改'+this.studentForm.username+'信息', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        request.put(CurrentURL + "/updateStudent",this.studentForm).then(res =>{
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
      }).catch(action => {
        this.$message({
          type: 'info',
          message: '取消操作'
        })
      })

    },

    // 多选
    handleSelectionChange(val){
      this.multipleSelection = val
    },

    // 批量删除
    handleBatchDelete(){
      let ids = this.multipleSelection.map(v => v.id)
      this.$confirm('是否要批量删除学生', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        if (ids.length == 0){
          this.$message.error('请选择删除的学生对象')
        }
        request.post(CurrentURL + '/batchDelRelation',ids).then(res => {
          if (res.code === this.getStatusCode('SUCCESS')){
            this.$message.success('删除成功')
            this.load()
            this.loadStudent()
          }
          else{
            this.$message.error(res.msg)
          }
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: '取消操作'
        })
      })
    }
  },
}
</script>

<style scoped>
.my-form-item{
  font-size: 15px;
  font-weight: bold;
}

</style>