<template>
  <div class="card-container" style="margin-top: 30px;">
    <el-card class="box-card" style="width: 700px; ">
      <div id="main" style="width: 700px; height: 400px;"></div>
    </el-card>
  </div>
</template>

<script>
import {CovidSituationClockOption} from "@/echarts/CovidSituationClock";
import * as echarts from "echarts";

export default {
  name: "ClockSituation",
  mounted () {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    // 在 echarts 实例中设置选项
    myChart.setOption(this.clockSituation)
  },
  data(){
    return{
      clockSituation:CovidSituationClockOption,
    }
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>