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
        <el-form-item prop="phone">
          <el-input
              style="margin: 10px 0"
              prefix-icon="el-icon-user"
              size="medium"
              name="phone"
              v-model="user.phone"
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
              type="password"
              @keyup.enter.native="Login"
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
                @click.native.prevent="login"
            >登录</el-button>
            <el-button
                style="width: 48%"
                type="success"
                @click="dialogFormVisible = true"
            >注册</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

<el-dialog title="用户注册" :visible.sync="dialogFormVisible" center="">
  <el-form :model="userRegister"
           :rules="userRegisterRules"
           ref="userRegisterForm">
    <el-form-item label="用户手机号" label-width="100px" prop="phone">
      <el-input v-model="userRegister.phone" autocomplete="off" size="small" label-width="40px"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="100px" prop="pass">
      <el-input  show-password type="password" v-model="userRegister.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" label-width="100px" prop="checkPass">
      <el-input show-password type="password" v-model="userRegister.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="身份" label-width="100px" prop="identity">
      <el-select
        v-model="userRegister.identity"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="identity in identities"
          :key="identity.value"
          :label="identity.label"
          :value="identity.value"
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
  },
  name: "login",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === ''  || typeof value === 'undefined') {
        callback(new Error('请输入密码'));
      }
      else if (value.length < 6 || value.length > 12) {
        callback(new Error('密码长度为 6 到 12 个字符'))
      }
      else {
        if (this.userRegister.checkPass !== '') {
          this.userRegister.password = value
          this.$refs.userRegisterForm.validateField('password');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '' || typeof value === 'undefined') {
        callback(new Error('请再次输入密码'));
      }
      else if (value !== this.userRegister.pass) {
        callback(new Error('两次输入密码不一致!'));
      }
      else {
        this.userRegister.rePassword = value
        callback();
      }
    };
    return {
      identities: [
        {
          value: "老师",
          label: "老师",
        },
        {
          value: "学生",
          label: "学生",
        }
      ],
      dialogFormVisible : false,
      userRegister:{
        phone: "",
        password: "",
        rePassword:"",
        identity:""
      },
      user: {
        phone: "",
        password: "",
        identity: ""
      },
      userLoginRules: {
        phone: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      },
      userRegisterRules:{
        phone: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger:'blur'}
        ],
        checkPass:[
          { validator: validatePass2, trigger:'blur'}
        ]
      },
      pwdType: "password",
    };
  },
  methods: {
    register(){
        this.$refs['userRegisterForm'].validate((valid) => {
          if (valid) {
            request.post('user/register.do',this.userRegister).then((res) => {
              if (res.code === this.getStatusCode('SUCCESS')){
                this.dialogFormVisible = false
                this.$message.success('注册成功')
              }
              else {
                this.$message.error(res.msg)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

    },
    login() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          request.post('/user/login.do',this.user).then((res)=>{
            console.log(res)
            // console.log(res.objectMap)
            if(res.code === this.getStatusCode('SUCCESS')){
              localStorage.setItem("user",JSON.stringify(res.data)) //存储用户信息到浏览器
              this.$message({
                message: '登录成功',
                type: 'success',
                center: true
              });
              this.$router.push('/teacher/manage')
            }
            else {
              this.$message.error({
                message: res.msg,
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