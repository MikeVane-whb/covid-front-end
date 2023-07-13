<template>
  <div>
      <img class="school-img" src="../../img/school.jpg" alt="school"/>
      <el-tabs type="border-card" style="width: 65%; float: left; margin-top: 20px">
        <el-tab-pane label="修改密码">
          <el-form :model="studentPassword"
                   :rules="studentPasswordRules"
                   ref="studentPasswordForm"
                   style="margin-top: 20px">
            <el-form-item label="密码" label-width="100px" prop="pass" required>
              <el-input  show-password type="password" v-model="studentPassword.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="100px" prop="checkPass" required>
              <el-input show-password type="password" v-model="studentPassword.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="change-pass-el-from-item" size="medium">
              <el-button type="primary" size="medium" @click="updatePassword('studentPasswordForm')">修改密码</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改电话">
          <el-form :model="studentPhone"
                   :rules="studentPhoneRule"
                   ref="studentPhoneForm"
                   style="margin-top: 20px">
            <el-form-item label="手机号" label-width="100px" prop="checkPhone" required>
              <el-input v-model="studentPhone.checkPhone" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item class="change-phone-el-from-item" size="medium">
              <el-button type="primary" size="medium" @click="updatePhone('studentPhoneForm')">修改手机号</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-card>
          <Footer/>
        </el-card>
      </el-tabs>

    <el-card style="width: 30%;float: right;background: #F5F5DC;">
      <img class="school-motto-img" src="../../img/校徽.jpg" alt="校徽"/>
      <br>
      <p class="school-motto-p">修德 博学</p>
      <br>
      <p class='school-motto-p'>求实 创新</p>
    </el-card>
  </div>
</template>

<script>
import request from "@/plugins/axios";
import Footer from "@/components/Footer";
const CurrentURL = "/student"

export default {
  name: "ModifyPassword",
  components: {Footer},
  data(){
    const validatePass = (rule, value, callback) => {
      if (value === ''  || typeof value === 'undefined') {
        callback(new Error('请输入密码'));
      }
      else if (value.length < 6 || value.length > 12) {
        callback(new Error('密码长度为 6 到 12 个字符'))
      }
      else {
        if (this.studentPassword.checkPass !== '') {
          this.studentPassword.password = value
          this.$refs.studentPasswordForm.validateField('password');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '' || typeof value === 'undefined') {
        callback(new Error('请再次输入密码'));
      }
      else if (value !== this.studentPassword.pass) {
        callback(new Error('两次输入密码不一致!'));
      }
      else {
        this.studentPassword.rePassword = value
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      const phoneRegEx = /^1[3-9]\d{9}$/;
      if (value === ''  || typeof value === 'undefined') {
        callback(new Error('请输入手机号'));
      }
      else if (!phoneRegEx.test(value)){
        callback(new Error('请输入正确格式的手机号'))
      }
      else{
        this.studentPhone.phone = value
        callback();
      }
    }
    return{
      studentPassword:{
        password:'',
        rePassword:''
      },
      studentPasswordRules:{
        pass: [
          { validator: validatePass, trigger:'blur'}
        ],
        checkPass:[
          { validator: validatePass2, trigger:'blur'}
        ]
      },
      studentPhone:{
        phone:''
      },
      studentPhoneRule:{
        checkPhone: [
          {validator: validatePhone, trigger:'blur'}
        ]
      },
    }
  },
  methods:{
    updatePassword(value){
      this.$refs[value].validate((valid) => {
        if (valid){
          this.$confirm('是否要修改密码', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            request.put(CurrentURL + '/updatePassword',this.studentPassword).then(res => {
              if (res.code === this.getStatusCode('SUCCESS')) {
                this.$message.success("修改成功");
                localStorage.clear()
                this.$router.push('/')
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
          this.$message.error('修改失败')
          return false;
        }
      })
    },
    updatePhone(value){
      this.$refs[value].validate((valid) => {
        if (valid){
          this.$confirm('是否要修改手机(修改后登录手机号也会改变)', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            request.put(CurrentURL + '/updatePhone',this.studentPhone).then(res => {
              if (res.code === this.getStatusCode('SUCCESS')) {
                this.$message.success("修改成功");
                localStorage.clear()
                this.$router.push('/')
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
          this.$message.error('修改失败')
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>

.school-motto-img{
  width: 256px;
  height: 256px;
  display: block;
  margin: 0 auto;
}

.school-img{
  width: 100%;
  height: 200px;
  display: block;
  margin: 0 auto;
}

.school-motto-p{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  background-image: linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%);
}


.change-pass-el-from-item,.change-phone-el-from-item{
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>