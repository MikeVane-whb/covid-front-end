<template>
  <el-cascader
      :options="options"
      ref="cascaderAddr"
      :props="xprops"
      v-model="selectedOptions"
      @change="handleChange">
  </el-cascader>
</template>

<script>
import pcas from '../../assets/pca-code.json'
export default {
  name: "Leave",
  data() {
    return {
      options: pcas,
      selectedOptions: [],
      xprops: {
        value: 'code',
        label: 'name'
      }
    }
  },
  methods: {
    // 获取省市区地址级联
    handleChange(e, form, thsAreaCode) {
      thsAreaCode = this.$refs['cascaderAddr'].getCheckedNodes()[0].pathLabels// 注意2： 获取label值
      console.log(thsAreaCode) // 注意3： 最终结果是个一维数组对象
      console.log(thsAreaCode[0] + thsAreaCode[1] + thsAreaCode[2])
    },
  },
}
</script>

<style scoped>

</style>