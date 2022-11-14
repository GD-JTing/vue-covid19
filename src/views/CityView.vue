<template>
  <div>
    <div class="header">
      {{city}}
    </div>
    <div id="city"></div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  props: {
    city: {
      type: String,
      default: ""
    }
  },
  mounted () {
    var citys = [];
    axios.get("api/covid19-server/json/china.json").then(res => {
      if (res.status === 200) {
        // console.log(res.data);
        for (var i = 0; i < res.data.retdata.length; i++) {
          if (res.data.retdata[i].xArea === this.city) {
            for (var j = 0; j < res.data.retdata[i].subList
              .length; j++) {
              var temp = {
                name: res.data.retdata[i].subList[j].city + "市",
                value: res.data.retdata[i].subList[j].curConfirm
              }
              citys.push(temp)
            }
          }
        }
      }
      this.$charts.provinceMap("city", this.city, citys)
    })
  }
}
</script>
<style scoped>
.header {
  background-color: #3443ff;
  width: 100%;
  height: 50px;
  color: #fff;
  line-height: 50px;
  font-size: 16px;
  text-align: center;
}
#city {
  width: 375px;
  height: 550px;
}
</style>