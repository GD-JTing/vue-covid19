<script>
import Content from "./contentName.vue"
export default {
  name: "TabsName",
  data () {
    return {
      pans: []
    }
  },
  props: {
    currentIndex: {
      type: [String, Number],
      default: "1"
    }
  },
  methods: {
    getIndex (index) {
      // 接收到index
      this.$emit("onIndex", index)
    }
  },
  render () {
    // pans[]:tab,tab,tab
    return (
      <div>
        <ul class="tabs-header">{this.$slots.default}</ul>
        <Content pans={this.pans} />
      </div>
    )
  }
}
</script>
<style scoped>
.tabs-header {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 2px solid #ededed;
}
</style>