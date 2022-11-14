<script>
export default {
  name: "ContentName",
  props: {
    pans: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  render () {
    return (
      <div>
        {
          this.pans.map((ele) => {
            // 通过ele.isActive来指定内容
            // return ele.isActive ? ele.$slots.default : ""
            return <div style={{ display: ele.isActive ? 'block' : 'none' }}>{ele.$slots.default}</div>
          })
        }
      </div>
    )
  }
}
</script>
<style scoped>
</style>