<template>
  <div class="wrapper">
    <div class="login-view">
      <div style="margin: 20px 0; text-align: center;font-size: 24px"><b>疫情防控管理系统登录</b></div>
      <el-form
          autocomplete="on"
          :rules="userLoginRules"
          :model="user"
          ref="userForm"
          label-position="left"
      >
        <el-form-item prop="username">
          <el-input
              style="margin: 10px 0"
              prefix-icon="el-icon-user"
              size="medium"
              name="username"
              v-model="user.username"
              autocomplete="on"
              placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="userRegister" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="login-password">
          <el-input
              style="margin: 10px 0"
              prefix-icon="el-icon-lock"
              size="medium"
              name="password"
              :type="pwdType"
              @keyup.enter.native="login"
              v-model="user.password"
              autocomplete="on"
              placeholder="请输入密码"
              show-password
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <div style="margin: 10px 0; text-align: left">
          <el-radio v-model="user.identity" label="学生">学生</el-radio>
          <el-radio v-model="user.identity" label="老师">老师</el-radio>
        </div>
        <div style="margin: 10px 0; text-align: right">
          <el-form-item style="margin-bottom: 10px">
            <el-button
                style="width: 48%"
                type="primary"
                :loading="loading"
                @click.native.prevent="login"
            >登录</el-button>
            <el-button
                style="width: 48%"
                type="success"
                :loading="loading"
                @click="dialogFormVisible = true"
            >注册</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

<el-dialog title="用户注册" :visible.sync="dialogFormVisible" center="">
  <el-form :model="userRegister"
           :rules="userRegisterRules"
           ref="ruleForm">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="userRegister.username" autocomplete="off" size="small" :label-width="LabelWidth"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input  show-password :type="pwdType" v-model="userRegister.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" :label-width="formLabelWidth">
      <el-input show-password :type="pwdType" v-model="userRegister.rePassword" autocomplete="off"></el-input>
    </el-form-item>
 <el-form-item label="所属部门" :label-width="formLabelWidth">
            <el-select
              v-model="userRegister.depart"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in options2"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="register()">注 册</el-button>
  </div>
</el-dialog>
  </div>
</template>
 
<script>
import request from "@/plugins/axios";

export default {
  created(){
        request.get("http://localhost:8080/depart/findAll").then((resp) => {
      this.options2 = resp.data;
    });
  },
  name: "login",
  data() {
    return {
      options2: [
        {
          value: "",
          label: "",
        },
      ],
      formLabelWidth:'120px',
      LabelWidth:'40px',
      dialogFormVisible : false,
      userRegister:{
        username: "",
        password: "",
        rePassword:"",
        identity:""
      },
      user: {
        username: "",
        password: "",
        identity: ""
      },
      userLoginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      },
      userRegisterRules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      pwdType: "password",
    };
  },
  methods: {
    register(){
      this.dialogFormVisible = false
         if(this.userRegister.username==""||this.userRegister.password=="") {
                            this.$alert("注册用户名或密码不能为空")
                            this.loading=false;
           }
         else if(this.userRegister.password==this.userRegister.rePassword){
        axios.post('/user/register.do',this.userRegister).then((resp)=>{
          console.log(resp)
          this.loading=true;
                if(resp.data=='success'){
                  this.loading=false;
                this.$alert("注册成功!请登录");
                }else if(resp.data=='repeat'){
                   this.loading=false;
                   this.$alert('用户名已存在!请重新注册')
                }else{
                  this.loading=false;
                  this.$alert("注册失败!请重新注册")
                  window.location.reload()
                }
        })}
        else {
          this.$alert("两次输入的密码不一致!");
        }
    },
    login() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          request.post('/user/login.do',this.user).then((resp)=>{
            console.log(resp)
            if(resp.code === '200'){
              this.$message({
                message: '登录成功',
                type: 'success',
                center: true
              });
              this.$router.push('/index')
            }
            else {
              this.$message.error({
                message: resp.msg,
                center: true
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      }
    }
  };
</script>
 
<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}
 
.login-title {
  text-align: center;
}
.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}

.el-radio{
  margin-bottom: 20px;
}

.wrapper{
  height: 100vh;
  background-image: linear-gradient(to bottom right,#81FFEF,#F067B4);
  overflow: hidden;
}

.login-view{
  margin: 200px auto;
  background-color: #fff;
  width: 350px;
  height: 300px;
  padding: 20px;
  border-radius: 10px;
  opacity: 0.8;
}

</style>