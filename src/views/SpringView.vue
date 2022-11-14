<template>
  <div>
    <div class="from">
      <!-- 出发城市名称 -->
      <h3>{{ fromInfo.city_name }}</h3>
      <p>{{ fromInfo.high_in_desc }}</p>
      <p>{{ fromInfo.low_in_desc }}</p>
      <p>{{ fromInfo.out_desc }}</p>
    </div>
    <hr>
    <div class="to">
      <!-- 到达城市名称 -->
      <h3>{{ toInfo.city_name }}</h3>
      <p>{{ toInfo.high_in_desc }}</p>
      <p>{{ toInfo.low_in_desc }}</p>
      <p>{{ toInfo.out_desc }}</p>
    </div>
  </div>
</template>

<script>
import api from "../api"
export default {
  // 呈现数据 
  data () {
    return {
      fromInfo: {},
      toInfo: {}
    }
  },
  props: {
    // 接收数据
    citys: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
    api.springTravelQuery({
      key: "9e2a7aba4f86274dfea0ebb938fb112b",
      // 指定出发和到达城市
      from: this.citys[0].value,
      to: this.citys[1].value
    }).then(res => {
      if (res.status === 200) {
        this.fromInfo = res.data.result.from_info
        this.toInfo = res.data.result.to_info
      }
    })
  }
}
</script>
<style scoped>
</style>