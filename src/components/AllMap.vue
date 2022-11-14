<template>
  <div>
    <p class="title"><i></i>疫情地图</p>
    <TabsName :currentIndex="currentIndex" @onIndex="getIndex">
      <!-- 中国地图 -->
      <TabName index="1" label="国内疫情">
        <div id="chinaMap"></div>
      </TabName>
      <!-- 世界地图 -->
      <TabName index="2" label="国际疫情">
        <div id="worldMap"></div>
      </TabName>
    </TabsName>
  </div>
</template>

<script>
// 引入api
// import api from "../api"
import axios from "axios"
export default {
  data () {
    return {
      currentIndex: "1"
    }
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    function ncovCity () {
      return axios.get("api/covid19-server/json/china.json")
    }
    function ncovaBroad () {
      return axios.get("https://apis.tianapi.com/ncovabroad/index?key=0149a49ef62c4a253541c5fb8c1182f9")
    }

    // 合并网络请求
    axios.all([ncovCity(), ncovaBroad()]).then(axios.spread((ncovCity, ncovaBroad) => {
      // 两个请求完成
      /**
       * 省市处理
       * 读取数据，数据格式：{ name: "内蒙古", value: 10, itemStyle: { normal: { areaColor: "#fff" } } }
       */
      let allCities = [];
      for (let i = 0; i < ncovCity.data.retdata.length; i++) {
        let temp = {
          name: ncovCity.data.retdata[i].xArea,
          value: ncovCity.data.retdata[i].curConfirm, // 当前确诊
        }
        // 每遍历一次，push一次数据
        allCities.push(temp)
      }
      /**
       * 国际处理
       * 读取数据：{name: '俄罗斯', value: 2000}
       */
      let worlds = [];
      for (let j = 0; j < ncovaBroad.data.result.list.length; j++) {
        let temp = {
          name: ncovaBroad.data.result.list[j].provinceName,
          value: ncovaBroad.data.result.list[j].currentConfirmedCount
        }
        worlds.push(temp)
      }
      // 注意不要重复渲染
      this.$charts.chinaMap("chinaMap", allCities);
      this.$charts.worldMap("worldMap", worlds);
    }));
  },
  methods: {
    getIndex (index) {
      this.currentIndex = index
    }
  }
}
</script>
<style scoped>
#chinaMap {
  width: 375px;
  height: 400px;
}
#worldMap {
  width: 375px;
  height: 400px;
}
.title {
  border-top: 0.005rem solid #ebebeb;
  border-bottom: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  height: 0.44rem;
  padding: 0 0.16rem;
  font-weight: 500;
  font-size: 0.17rem;
  line-height: 0.44rem;
  background: #fff;
}
.title::before {
  content: '';
  width: 5px;
  height: 20px;
  background: #4169e2;
  margin-right: 10px;
}
</style>