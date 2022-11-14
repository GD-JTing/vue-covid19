### 如何使用

```html
<TabsName :currentIndex="currentIndex" @onIndex="getIndex">
  <TabName index="1" label="tab1">
    <div>内容1</div>
  </TabName>
  <TabName index="2" label="tab2">
    <div>内容2</div>
  </TabName>
  <TabName index="3" label="tab3">
    <div>内容3</div>
  </TabName>
</TabsName>
```

```js
<script>
export default{
	data(){
		return{
			currentIndex:"1"
		}
	},
	methods:{
		getIndex(index){
			// index下标
		}
	}
}
</script>
```
