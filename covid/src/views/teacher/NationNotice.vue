<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-input v-model="title" style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入标题"></el-input>
      <el-button class="ml-5" type="primary" @click="load" style="margin-left: 10px">搜索 <i class="el-icon-search"></i></el-button>
    </div>

    <div style="margin-bottom: 10px">
      <el-button type="primary" @click="handleInsert">新增通知 <i class="el-icon-circle-plus-outline"></i></el-button>
    </div>

    <el-table :data="nationRecord" border
              @selection-change="handleSelectionChange"
              :default-sort = "{prop: 'id', order: 'descending'}"
              :row-class-name="tableRowClassName">
      <el-table-column prop="id" label="序号"  align="center" sortable/>
      <el-table-column prop="title" label="标题"  align="center"/>
      <el-table-column prop="publishTime" label="发布时间"  align="center"/>
      <el-table-column prop="publisher" label="发布者"  align="center"/>
      <el-table-column prop="receiver" label="接收人群"  :formatter="formatReceiver" align="center"/>
      <el-table-column prop="status" label="通知状态"  align="center" :formatter="formatStatus"/>
      <el-table-column label="操作" align="center" min-width="150">
        <template v-slot="scope">
          <el-button type="info" @click="check(scope.row)">查看 <i class="el-icon-edit"></i></el-button>
          <el-button type="primary" @click="edit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
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

    <el-dialog title="校内通知信息" :visible.sync="nationInfoVisible" width="40%">
      <el-descriptions class="margin-top" title="通知信息预览" :column="1"  border size="medium">
        <el-descriptions-item label="序号">{{nationInfo.id}}</el-descriptions-item>
        <el-descriptions-item label="标题">{{nationInfo.title}}</el-descriptions-item>
        <el-descriptions-item label="发布时间">{{nationInfo.publishTime}}</el-descriptions-item>
        <el-descriptions-item label="发布者">{{nationInfo.publisher}}</el-descriptions-item>
        <el-descriptions-item label="发布内容">{{nationInfo.content}}</el-descriptions-item>
        <el-descriptions-item label="接收人群">
          <el-tag size="small">{{nationInfo.receiver | formatReceiver}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="通知状态">
          <el-tag size="small">{{nationInfo.status | formatStatus}}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <el-dialog title="发布新通知" :visible.sync="nationFormVisible"  width="40%">
      <el-form :model="nationForm"
               :rules="nationFormRule"
               ref="nationForm"
               label-width="130px">
        <el-form-item label="标题" prop="title" size="small"  >
          <el-input v-model="nationForm.title"></el-input>
        </el-form-item>
        <el-form-item label="发布者" prop="publisher" size="small"  >
          <el-input v-model="nationForm.publisher" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" prop="content" size="small" >
          <el-input type="textarea" v-model="nationForm.content" :autosize="{ minRows: 6, maxRows: 8}" resize="none"></el-input>
        </el-form-item>
        <el-form-item label="接收人群" prop="receiver" size="small"  >
          <el-select v-model="nationForm.receiver"
                     placeholder="请选择接收人群">
            <el-option label="学生" value='0'></el-option>
            <el-option label="教师" value='1'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知状态" prop="status" size="small"  >
          <el-select v-model="nationForm.status" placeholder="请选择通知状态" >
            <el-option label="发布" value='0'></el-option>
            <el-option label="撤销" value='1'></el-option>
            <el-option label="过期" value='2'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="change-info-el-from-item" size="small">
          <el-button type="primary" size="4" @click="insertNotice('nationForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="编辑新通知" :visible.sync="editNationFormVisible"  width="40%">
      <el-form :model="nationForm"
               :rules="nationFormRule"
               ref="nationForm"
               label-width="130px">
        <el-form-item label="标题" prop="title" size="small"  >
          <el-input v-model="nationForm.title"></el-input>
        </el-form-item>
        <el-form-item label="发布者" prop="publisher" size="small"  >
          <el-input v-model="nationForm.publisher" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" prop="content" size="small" >
          <el-input type="textarea" v-model="nationForm.content" :autosize="{ minRows: 6, maxRows: 8}" resize="none"></el-input>
        </el-form-item>
        <el-form-item label="接收人群" prop="receiver" size="small"  >
          <el-select v-model="nationForm.receiver"
                     placeholder="请选择接收人群">
            <el-option label="学生" value='0'></el-option>
            <el-option label="教师" value='1'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知状态" prop="status" size="small"  >
          <el-select v-model="nationForm.status" placeholder="请选择通知状态" >
            <el-option label="发布" value='0'></el-option>
            <el-option label="撤销" value='1'></el-option>
            <el-option label="过期" value='2'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="change-info-el-from-item" size="small">
          <el-button type="primary" size="4" @click="updateNotice('nationForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import {NoticeForm, NoticeInfo} from "@/data/TeacherDataDefine";
import request from "@/plugins/axios";

const CurrentURL = '/teacher/nationNotice'
export default {
  name: "NationNotice",
  filters:{
    formatStatus(value) {
      if (value == null) return '';
      switch (value){
        case 0: return '已发布'
        case 1: return '已撤销'
        case 2: return '已过期'
        default: return ''
      }
    },
    formatReceiver(value) {
      if (value == null) return '';
      switch (value){
        case 0: return '学生'
        case 1: return '教师'
        default: return ''
      }
    }
  },
  created() {
    this.load();
    this.initNationForm();
  },
  data(){
    return{
      nationRecord:[],
      nationInfo:NoticeInfo.noticeInfo,
      nationForm:NoticeForm.noticeForm,
      nationFormRule:NoticeForm.noticeFormRule,
      total: 0,
      pageNum: 1,
      pageSize: 5,
      title: '',
      gradeClasses: [],
      nationInfoVisible: false,
      nationFormVisible: false,
      editNationFormVisible: false,
      multipleSelection:[],
    }
  },
  methods:{
    initNationForm(){
      let teacher = JSON.parse(localStorage.getItem("teacher"));
      Object.keys(this.nationForm).forEach(key => this.nationForm[key] = '')
      this.nationForm.publisher = teacher.username
    },
    load(){
      request.get(CurrentURL + '/getNotice',{
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.title,
        }
      }).then(res => {
        if (res.code === this.getStatusCode('SUCCESS')){
          this.nationRecord = res.data.records
          this.total = res.data.total
        }
        else{
          this.$message.error(res.msg)
        }
      })
    },
    check(value){
      this.nationInfo = value;
      this.nationInfoVisible = true;
    },
    edit(value){
      value.receiver = ''
      value.status = ''
      this.nationForm = value
      this.editNationFormVisible = true
    },
    handleInsert(){
      this.initNationForm();
      this.nationFormVisible = true
    },
    insertNotice(value){
      this.$refs[value].validate((valid) => {
        if (valid){
          this.$confirm('是否要发布新通知', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '发布',
            cancelButtonText: '取消'
          }).then(() => {
            request.post(CurrentURL + '/insertNotice', this.nationForm).then(res => {
              if (res.code === this.getStatusCode('SUCCESS')) {
                this.$message.success("发布成功");
                this.load();
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
        }
        else{
          this.$message.error('发布失败')
          return false;
        }
      })
    },
    updateNotice(value){
      this.$refs[value].validate((valid) => {
        if (valid){
          this.$confirm('是否要编辑通知', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '编辑',
            cancelButtonText: '取消'
          }).then(() => {
            request.post(CurrentURL + '/updateNotice', this.nationForm).then(res => {
              if (res.code === this.getStatusCode('SUCCESS')) {
                this.$message.success("编辑成功");
                this.load();
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
        }
        else{
          this.$message.error('发布失败')
          return false;
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
        case 0: return 'success-row'
        case 1: return 'warning-row'
        case 2: return 'error-row'
        default: return ''
      }
    },
    // 多选
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    formatStatus(row,column) {
      if (!row) return '';
      switch (row.status){
        case 0: return '已发布'
        case 1: return '已撤销'
        case 2: return '已过期'
        default: return ''
      }
    },
    formatReceiver(row,column) {
      if (!row) return '';
      switch (row.receiver){
        case 0: return '学生'
        case 1: return '教师'
        default: return ''
      }
    },
  }
}
</script>

<style scoped>

</style>