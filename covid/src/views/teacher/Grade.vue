<template>
 <div>
   <div style="margin-bottom: 10px">
     <el-input v-model="gradeClass" style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入班级号"></el-input>
     <el-button class="ml-5" type="primary" @click="loadGrade">搜索</el-button>
   </div>

   <div style="margin-bottom: 10px">
     <el-button type="primary" @click="handleInsert">新增班级 <i class="el-icon-circle-plus-outline"></i></el-button>
     <el-button type="danger" @click="handleBatchDelete">批量删除 <i class="el-icon-remove-outline"></i></el-button>
   </div>

   <el-table :data="gradeInfo" border
             @selection-change="handleSelectionChange">
     <el-table-column type="selection" width="55"/>
     <el-table-column prop="gradeClass" label="班级号" width="200" align="center"/>
     <el-table-column prop="count" label="总人数" align="center" />
     <el-table-column label="操作" align="center">
       <template v-slot="scope">
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

   <el-dialog title="添加班级" :visible.sync="dialogTableVisible" width="30%">
     <el-form :model="tempGrade" style="width: 90%">
       <el-form-item label="班级号" prop="gradeClass" size="medium"  >
         <el-input v-model="tempGrade.gradeClass"></el-input>
       </el-form-item>
       <el-form-item class="change-info-el-from-item" size="medium">
         <el-button type="primary" @click="addGrade()">添 加</el-button>
       </el-form-item>
     </el-form>
   </el-dialog>
 </div>
</template>

<script>
import request from "@/plugins/axios";
import {TeacherGradeInto} from "@/data/TeacherDataDefine";

const CurrentURL = "/teacher/grade"

export default {
  name: "Student",
  created() {
    this.loadGrade()
  },
  data(){
    return{
      pageNum: 1,
      pageSize: 5,
      total: 0,
      gradeClass: '',
      gradeInfo: [{TeacherGradeInto}],
      otherGradeInfo:[],
      tempGrade:{
        gradeClass:''
      },
      grade:{
        gradeClass:''
      },
      multipleSelection: [],
      dialogTableVisible: false,
    }
  },
  methods:{
    // 加载当前老师所管理的班级信息
    loadGrade(){
      request.get(CurrentURL + "/getGradePage", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          gradeClass: this.gradeClass
        }
      }).then(res => {
        if (res.code === this.getStatusCode('SUCCESS')){
          this.gradeInfo = res.data.records
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
      this.loadGrade()
    },

    handleCurrentChange(pageNum){
      this.pageNum = pageNum
      this.loadGrade()
    },
    handleInsert(){
      this.dialogTableVisible = true
    },
    // 删除
    handleDelete(value){
      this.$confirm('是否要删除班级:'+value.gradeClass, '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        request.delete(CurrentURL + '/deleteGrade/'+value.gradeClass).then(res => {
          if (res.code === this.getStatusCode('SUCCESS')) {
            this.$message.success("删除成功");
            this.loadGrade();
          }
          else {
            this.$message.error(res.msg)
          }
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: '取消添加'
        })
      });
    },
    // 批量删除
    handleBatchDelete(){
      let values = this.multipleSelection.map(v => v.gradeClass);
      // console.log(values)
      this.$confirm('是否要批量删除班级号', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        if (values.length == 0){
          this.$message.error('请选择删除的班级号')
        }
        request.delete(CurrentURL + '/deleteGrade',{data:values}).then(res => {
          if (res.code === this.getStatusCode('SUCCESS')){
            this.$message.success('删除成功')
            this.loadGrade()
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
    },
    // 多选
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    // 添加班级
    addGrade(){
      this.$confirm('是否要添加班级:'+this.tempGrade.gradeClass, '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        request.put(CurrentURL + '/insertGrade/' + this.tempGrade.gradeClass).then(res => {
          if (res.code === this.getStatusCode('SUCCESS')) {
            this.$message.success("添加成功");
            this.loadGrade();
          }
          else {
            this.$message.error(res.msg)
          }
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: '取消添加'
        })
      });
    }
  }
}
</script>

<style scoped>

</style>