<template>
  <div class="home">
    <Header />
    <!-- 传数据 -->
    <Covid19Info :covid19Info="covid19Info" />
    <CaseNum :caseNumData="caseNumData" />
    <AllMap />
    <MySwiper />
    <SpringTravel />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/HeaderName.vue"
import api from "../api"
import Covid19Info from "../components/Covid19Info.vue"
import CaseNum from "../components/CaseNum.vue"
import AllMap from "../components/AllMap.vue"
import MySwiper from "../components/MySwiper.vue"
import SpringTravel from "../components/SpringTravel.vue"

export default {
  name: 'HomeView',
  components: {
    Header,
    Covid19Info,
    CaseNum,
    AllMap,
    MySwiper,
    SpringTravel
  },
  data () {
    // 疫情信息：covid19Info
    return {
      covid19Info: {
        note1: "",
        note2: "",
        note3: "",
        remark1: "",
        remark2: "",
        remark3: ""
      },
      caseNumData: {
        modifyTime: "", // 数据更新时间
        currentConfirmedCount: "", // 现存确诊人数
        confirmedCount: "", // 累计确诊人数
        suspectedCount: "", // 累计境外输入人数
        curedCount: "", // 累计治愈人数
        deadCount: "", // 累计死亡人数
        seriousCount: "", // 现存无症状人数
        currentConfirmedIncr: "", // 相比昨天现存确诊人数
        confirmedIncr: "", // 相比昨天累计确诊人数
        suspectedIncr: "", // 新增境外输入人数
        curedIncr: "", // 相比昨天新增治愈人数
        deadIncr: "", // 相比昨天新增死亡人数
        seriousIncr: "", // 相比昨天现存无症状人数
      }
    }
  },
  mounted () {
    // 获取疫情数据
    api.getNcov({
      key: "0149a49ef62c4a253541c5fb8c1182f9"
    }).then((res) => {
      if (res.status === 200) {
        let desc = res.data.newslist[0].desc;
        // 病毒信息数据
        this.covid19Info.note1 = desc.note1
        this.covid19Info.note2 = desc.note2
        this.covid19Info.note3 = desc.note3
        this.covid19Info.remark1 = desc.remark1
        this.covid19Info.remark2 = desc.remark2
        this.covid19Info.remark3 = desc.remark3
        // 疫情病例数据
        this.caseNumData.modifyTime = desc.modifyTime
        this.caseNumData.currentConfirmedCount = desc.currentConfirmedCount
        this.caseNumData.confirmedCount = desc.confirmedCount
        this.caseNumData.suspectedCount = desc.suspectedCount
        this.caseNumData.curedCount = desc.curedCount
        this.caseNumData.deadCount = desc.deadCount
        this.caseNumData.seriousCount = desc.seriousCount
        this.caseNumData.currentConfirmedIncr = desc.currentConfirmedIncr
        this.caseNumData.confirmedIncr = desc.confirmedIncr
        this.caseNumData.suspectedIncr = desc.suspectedIncr
        this.caseNumData.curedIncr = desc.curedIncr
        this.caseNumData.deadIncr = desc.deadIncr
        this.caseNumData.seriousIncr = desc.seriousIncr
      }
      // eslint-disable-next-line
    }).catch((error) => { });
  },
}
</script>
