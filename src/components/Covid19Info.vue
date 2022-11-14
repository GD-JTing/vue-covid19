<template>
  <div class="info">
    <p class="title">
      <i></i>
      病毒信息
    </p>
    <div class="content">
      <!-- <p>{{ covid19Info.note1 }}</p>
      <p>{{ covid19Info.note2 }}</p>
      <p>{{ covid19Info.note3 }}</p>
      <p>{{ covid19Info.remark1 }}</p>
      <p>{{ covid19Info.remark2 }}</p>
      <p>{{ covid19Info.remark3 }}</p> -->
      <p>病毒：SARS-CoV-2，其导致疾病命名COVID-19</p>
      <p>传染源：新冠肺炎的患者、无症状感染者也可能成为传染源</p>
      <p>传播途径：空气传播、接触传播等</p>
      <p>易感人群：人群普遍易感。老年人及有基础疾病者感染后病情较重，儿童及婴幼儿也有发病</p>
      <p>潜伏期：通常是1-14天，但是目前也出现过3-4周的潜伏期。</p>
      <p>宿主：野生动物，也可能为中华菊头蝠</p>
    </div>
  </div>
</template>

<script>
export default {
  // 接收数据
  props: {
    covid19Info: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>
<style scoped>
.info {
  padding: 0.16rem;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
}
.title {
  font-size: 0.17rem;
}

.title i {
  display: inline-block;
  width: 0.04rem;
  height: 0.16rem;
  margin-right: 0.03rem;
  vertical-align: middle;
  background: #4169e2;
}
.content {
  padding: 0.06rem 0.16rem;
}

.content p {
  font-size: 13px;
  margin: 5px 0;
}
</style>