<template>
  <div>
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" center="">
      <el-form :model="userRegister">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="userRegister.username" autocomplete="off" size="small" :label-width="LabelWidth"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input  show-password :type="pwdType" v-model="userRegister.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input show-password :type="pwdType" v-model="userRegister.repassword" autocomplete="off"></el-input>
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
export default {
  name: "register",
  created() {
  },
  data(){
    return{

    }
  },
  methods(){

  }
}
</script>

<style scoped>

</style>