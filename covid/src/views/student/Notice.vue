<template>
  <div>
    <el-card style="width: 60%;float: left">
      <div style="font-size: 20px;font-weight: bold; margin-bottom: 30px">
        <span>校内疫情通知</span>
      </div>
      <el-collapse accordion>
        <el-collapse-item class="notice-collapse-item"
            v-for="notice in notices" :key="notice.title">
          <template slot="title">
            <div>
              <span class="notice-title-span">{{notice.title}}</span>
              <span class="notice-publishTime-span" style="margin-left: 10px">{{notice.publishTime}}</span>
            </div>
          </template>
          <div class="notice-content-div">{{notice.content}}</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <el-card style="width: 35%; float: right">
      <div style="font-size: 18px;font-weight: bold; margin-bottom: 30px; color: #66b1ff">
        <span>国内疫情通知</span>
      </div>
      <el-collapse accordion>
        <el-collapse-item class="nation-notice-collapse-item"
                          v-for="nationNotice in nationNotices" :key="nationNotice.title">
          <template slot="title">
            <div>
              <span class="nation-notice-title-span">{{nationNotice.title}}</span>
              <span class="nation-notice-publishTime-span" style="margin-left: 10px">{{nationNotice.publishTime}}</span>
            </div>
          </template>
          <div class="nation-notice-content-div">{{nationNotice.content}}</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>




</template>

<script>

import {NationNotices, Notices} from "@/data/TeacherDataDefine";
import request from "@/plugins/axios";

const CurrentUrl = '/student/notice'

export default {
  name: "Notice",
  created() {
    this.loadNotice();
    this.loadNationNotice();
  },
  data(){
    return{
      notices:Notices,
      nationNotices:NationNotices,
    }
  },
  methods:{
    loadNotice(){
      request.get(CurrentUrl + '/getNotice').then(res =>{
        if (res.code === this.getStatusCode('SUCCESS')){
          for (let i = 0; i < res.data.length; i++){
            this.notices[i].title = res.data[i].title
            this.notices[i].content = res.data[i].content
            this.notices[i].publishTime = res.data[i].publishTime
          }
        }
        else {
          this.$message.error(res.msg)
        }
      })
    },
    loadNationNotice(){
      request.get(CurrentUrl + '/getNationNotice').then(res =>{
        if (res.code === this.getStatusCode('SUCCESS')){
          for (let i = 0; i < res.data.length; i++){
            this.nationNotices[i].title = res.data[i].title
            this.nationNotices[i].content = res.data[i].content
            this.nationNotices[i].publishTime = res.data[i].publishTime
          }
        }
        else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.notice-content-div{
  font-size: 16px;
  max-height: 300px;
  overflow-y: auto
}
.notice-title-span{
  font-size: 18px;
}
.notice-publishTime-span{
  font-size: 16px;
}
.nation-notice-collapse-item /deep/ .el-collapse-item__header{
  min-height: 30px;
  max-height: 60px;
  line-height: 20px;
}
.nation-notice-content-div{
  font-size: 15px;
  max-height: 200px;
  overflow-y: auto
}
.nation-notice-title-span{
  font-size: 16px;
}
.nation-notice-publishTime-span{
  font-size: 13px;
}
</style>