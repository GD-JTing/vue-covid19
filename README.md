# vue-covid19

## 知识点

1. Vue 基础知识
2. Axios 网络请求
3. Echarts 可视化
4. Swiper 焦点轮播图
5. Vue-Router
6. 封装组件

## vue 项目目录结构

1. build：构建脚本目录

build.js ---- 生产环境构建脚本
build-server.js ---- 运行本地构建服务器，可以访问构建后的页面
dev-client.js ---- 开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
dev-server.js ---- 运行本地开发服务器
check-version.js ---- 检查 npm、node.js 版本
utils.js ---- 构建相关工具方法
vue-loader.conf.js ---- 配置 css 加载器以及编译 css 之后自动添加前缀
webpack.base.conf.js ---- webpack 基本配置
webpack.dev.conf.js ----- webpack 开发环境配置
webpack.prod.conf.js ---- webpack 生产环境配置 2. config：项目配置

dev.env.js ---- 开发环境变量
index.js ---- 项目配置文件
prod.env.js ---- 生产环境变量
test.env.js ---- 测试环境变量 3. node_modules：npm 加载项目的依赖模块 4. src：源码目录

main.js ---- 入口 js 文件
app.vue ---- 根组件
components ---- 公共组件目录
assets ---- 资源目录，这里的资源会被 wabpack 构建
routes ---- 前端路由
store ---- 应用级数据（state）
views ---- 页面目录 5. static：静态资源目录。不会被 webpack 构建 6. package.json：npm 包配置文件，定义项目的 npm 脚本、依赖包等信息 7. README.md：项目的说明文档，markdown 格式

## 开发过程中的思维方式

1. 在 vue 框架中，组件式开发，所以我们应该将组件分离的更加细致一点

## 创建项目

1. vue create vue-covid19
2. 选择 Manually select features
3. 选中 router 后回车
4. 选 2.x
5. use history... 选 yes
6. 默认回车
7. save this as... 选 yes
8. 回车创建项目
9. code . 在 vscode 打开

## 安装依赖

```js
npm install --save axios
cnpm i less@3 less-loader@7 -S
```

## 删除无用的文件

1. 删除 helloworld.vue 组件
2. 打开 views 下的 homeView.vue 删除 helloworld 的引用
3. 把 aboutView.vue 删除掉
4. 去到路由里面，把 aboutView.vue 的相关依赖给删掉

```js
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
```

5. 删掉 App.vue 里面的样式
6. 删掉导航

```js
<router-link to="/">Home</router-link> |
<router-link to="/about">About</router-link>;
```

7. 删掉 homeview.vue 的图片

```js
	<img alt="Vue logo" src="../assets/logo.png">
```

## 初始样式

1. 在 assets 里面创建 css 文件夹
2. 在 css 文件夹里面新建公共样式 common.css 文件
3. 在 main.js 中引用初始化样式

```js
import "./assets/css/common.css";
```

## 头部模块

1.  在 components 文件夹里面创建 HeaderName.vue 文件
    1.1 输入 vue 创建模板
    1.2 在 assets 文件夹中放入图片
    1.3 写入样式

    ```js
    .header{
    	position: relative;
    	width: 100%;
    	height: 0;
    	padding-top: 33.5%;
    	color: #fff;
    	font-size: 0.28rem;
    	text-align: center;
    	background: url(../assets/1.jpg) no-repeat;
    	background-size: cover
    }
    ```

    1.4 在 views 文件夹中的 HomeViews.vue 文件中导入组件,图片就可以显示出来

    ```js
    <template>
      <div class="home">
        <Header />
      </div>
    </template>
    ```

    ```js
    <script>

    import Header from "../components/HeaderName.vue"
    export default {
    	name: 'HomeView',
    	components: {
    		Header
    	}
    }
    </script>
    ```

## 病毒信息模块

1. 需要网络请求
2. 在 src 文件夹里面创建 utils 文件夹, 新建 request.js 网络请求文件
3. 网络请求文件内容

```js
import axios from "axios";
import qs from "qs";

/**
 * 处理失败的方法
 * status:状态码
 * info:信息
 */
const errorHandle = (status, info) => {
  switch (status) {
    case 400:
      console.log(
        "语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。"
      );
      break;
    case 401:
      // token:令牌
      console.log("服务器认证失败");
      break;
    case 403:
      console.log("服务器已经理解请求，但是拒绝执行它");
      break;
    case 404:
      console.log("请检查网络请求地址");
      break;
    case 500:
      console.log(
        "服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现。"
      );
      break;
    case 502:
      console.log(
        "作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。"
      );
      break;
    default:
      console.log(info);
      break;
  }
};

/**
 * 创建axios实例对象
 */

const instance = axios.create({
  // 公共配置
  // baseURL:"http://iwenwiki.com",
  timeout: 5000,
});

/**
 * 处理拦截器
 */

/**
 * 请求拦截
 */
instance.interceptors.request.use(
  (config) => {
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 响应拦截
 */
instance.interceptors.response.use(
  // 完成了
  (response) =>
    response.status === 200
      ? Promise.resolve(response)
      : Promise.reject(response),
  (error) => {
    const { response } = error;
    errorHandle(response.status, response.info);
  }
);

export default instance;
```

4. 在 src 文件夹里面创建 api 文件夹
5. 在 api 文件夹里面创建 index.js 文件
6. 在 index.js 文件里面引入网络请求

```js
import axios from "../utils/request";
```

7. index.js 文件内容

```js
import axios from "../utils/request";

// 给axios请求设置相应设置
const base = {
  baseUrl: "http://api.tianapi.com",
  ncov: "/ncov/index", // 具体路径
};

const api = {
  /**
   * 疫情数据
   */
  getNcov(params) {
    return axios.get(base.baseUrl + base.ncov, {
      params,
    });
  },
};

// 导出api
export default api;
```

8. 在 HomeView.vue 中引入并应用 api

```js
import api from "../api";
```

```js
// 生命周期函数
  mounted () {
    // 获取疫情数据
    api.getNcov({
      key: "0149a49ef62c4a253541c5fb8c1182f9"
    }).then((res) => {
      console.log(res.data);
      // eslint-disable-next-line
    }).catch((error) => { });
  },
```

9.  病毒信息部分
    9.1 创建 Covid19Info.vue 文件
    9.2 在 HomeView.vue 导入
    import Covid19Info from "../components/Covid19Info.vue"
    9.3 在 HomeView.vue 声明 data 对象来处理数据
    ```js
    // 声明data对象
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
       }
     }
    },
    ```
    9.4 在 HomeView.vue 请求成功获取数据
    ```js
    mounted () {
     // 获取疫情数据
     api.getNcov({
       key: "0149a49ef62c4a253541c5fb8c1182f9"
     }).then((res) => {
       if (res.status === 200) {
         this.covid19Info.note1 = res.data.newslist[0].desc.note1
         this.covid19Info.note2 = res.data.newslist[0].desc.note2
         this.covid19Info.note3 = res.data.newslist[0].desc.note3
         this.covid19Info.remark1 = res.data.newslist[0].desc.remark1
         this.covid19Info.remark2 = res.data.newslist[0].desc.remark2
         this.covid19Info.remark3 = res.data.newslist[0].desc.remark3
       }
       // eslint-disable-next-line
     }).catch((error) => { });
    },
    ```
    9.5 在 HomeView.vue 传数据
    <Covid19Info :covid19Info="covid19Info" />
    9.6 在 Covid19Info.vue 文件中，用 props 来接收数据
    ```js
    export default {
      // 接收数据
      props: {
        covid19Info: {
          type: Object,
          default: function () {
            return {};
          },
        },
      },
    };
    ```
    9.7 在 Covid19Info.vue 文件中，添加相应样式
    ```js
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
    ```
    9.8 添加相应结构
    ```js
    <template>
    <div class="info">
    <p class="title">
     <i></i>
     病毒信息
    </p>
    <div class="content">
     <p>{{ covid19Info.note1 }}</p>
     <p>{{ covid19Info.note2 }}</p>
     <p>{{ covid19Info.note3 }}</p>
     <p>{{ covid19Info.remark1 }}</p>
     <p>{{ covid19Info.remark2 }}</p>
     <p>{{ covid19Info.remark3 }}</p>
    </div>
    </div>
    </template>
    ```
    9.9 由于接口更新，已无相应数据，所以病毒信息直接在页面结构写
    ```js
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
    ```
10. 全国数据统计部分
    10.1 新建 CaseNum.vue 组件

    ```js
        <template>
          <div>
            病例
          </div>
        </template>

        <script>
          export default {

          }
        </script>
        <style scoped>
        </style>
    ```

    10.2 在 HomeView.vue 页面导入 CaseNum 并显示引用
    import CaseNum from "../components/CaseNum.vue"

    ```js
        components: {
          Header,
          Covid19Info,
          CaseNum
        },
    ```

      <CaseNum />
      10.3 在 CaseNum.vue 中完成病例视图效果
      10.3.1 写页面样式
      10.3.2 页面结构信息
      10.3.3 在 HomeView.vue 声明 data 对象来处理数据
      ```js
      // 声明data对象
      data () {
       // 疫情信息：covid19Info
       return {
         CaseNumData: {
          modifyTime: ""
        }
       }
      },
      ```
      10.3.4 在 HomeView.vue 请求成功获取数据
      ```js
      mounted () {
       // 获取疫情数据
       api.getNcov({
         key: "0149a49ef62c4a253541c5fb8c1182f9"
       }).then((res) => {
         if (res.status === 200) {
           // 疫情病例数据
          this.CaseNumData.modifyTime = res.data.newslist[0].desc.modifyTime
         }
         // eslint-disable-next-line
       }).catch((error) => { });
      },
      ```
      10.3.5 在 HomeView.vue 传数据
      <CaseNum :caseNumData="caseNumData" />
      10.3.6 在 caseNum.vue 文件中，用 props 来接收数据
      ```js
      export default {
        // 接收数据
        props: {
          caseNumData: {
            type: Object,
            default: function () {
              return {};
            },
          },
        },
      };
      ```
      10.3.7 时间戳转换成正常时间格式
      （在CaseNum.vue中之间写个方法进行转换）
      ```js
      methods: {
      formatData (time) {
        var date = new Date(time);
        var YY = date.getFullYear() + "-";
        var MM =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var DD =
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
          "   ";
        var hh =
          (date.getHours() < 10
            ? "0" + date.getHours()
            : date.getHours()) + ":";
        var mm =
          date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes();
        return YY + MM + DD + hh + mm;
      },
    }
     ```
    10.3.8 其他数据以类似方法放入
    10.3.9 修改文本

11. Echarts 封装插件 - 主要看 vue-echarts-demo
12. 安装 echarts4.x(5.x 版本不支持地图)
    ```js
    npm install --save echarts@4.x
    ```
13. 在 src 中创建 plugins 文件夹，再创建 echarts.js 文件夹
14. 封装插件
15. 在 echarts.js 写
    ```js
    import echarts from "echarts";
    const install = function (Vue) {
      Object.defineProperties(Vue.prototype, {
        $charts: {
          get() {
            return {
              chinaMap() {},
            };
          },
        },
      });
    };
    // 导出
    export default install;
    ```
16. 新建 AllMap.vue 组件，并生成基础框架
17. 在 HomeView.vue 引入 AllMap 组件，并应用
    ```js
    import AllMap from "../components/AllMap.vue";
    ```
    ```js
    components: {
    Header,
    Covid19Info,
    CaseNum,
    AllMap
    },
    ```
    ```js
    <AllMap />
    ```
18. 在 AllMap 组件中调用 chinaMap 方法
    ```js
      mounted () {
    console.log(this.$charts.chinaMap);
    }
    ```
19. 在 main.js 中引用并使用 echarts.js
    ```js
    import Echarts from "./plugins/echart";
    Vue.use(Echarts);
    ```
20. 在 main.js 中引入 node_modules 中 echarts 中 map 中 js 的 china.js
    ```js
    import "../node_modules/echarts/map/js/china";
    ```
21. 补齐 echarts.js 中 chinaMap 方法
    ```js
    var option = {
      // 提示信息
      tooltip: {},
      // 资源配置
      series: [
        {
          name: "省", // 中国地图，里面匹配省
          type: "map", // 地图类型
          map: "china", // 中国地图
          roam: false, //是否允许自动缩放
          zoom: 1.2, // 地图缩放比例
          label: {
            // 配置颜色、字体等属性
            normal: {
              show: true, // 显示字体
              textStyle: {
                // 文字样式
                fontSize: 8,
              },
            },
          },
          // 地图样式配置
          itemStyle: {
            normal: {
              areaColor: "rgba(0,255,236,0)", // 区域颜色
              borderColor: "rgba(0,0,0,0.2)", // 边框颜色
            },
            emphasis: {
              // 阴影数据效果
              areaColor: "rgba(255,180,0,0.8)",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              // shadowColor: 'rgba(0,0,0,0.5)'
            },
          },
        },
      ],
    };
    // 使用
    myEcharts.setOption(option}
    ```
22. AllMap.vue 的样式、结构

    ````js
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
    ```js
    ```js
    <template>
      <div>
        <p class="title"><i></i>疫情地图</p>
        <div id="chinaMap"></div>
      </div>
    </template>
    ````

23. 修改 AllMap.vue 里面的 mounted 方法
    ```js
    mounted () {
    this.$charts.chinaMap("chinaMap");
    }
    ```
24. 在 api 中 index.js 添加省市数据
    ```js
    // 给 axios 请求设置相应设置
    const base = {
      // baseUrl: "http://api.tianapi.com",
      ncov: "http://api.tianapi.com/ncov/index", // 具体路径
      nocvCity: "api/covid19-server/json/china.json", // 省市数据
    };
    const api = {
      // 疫情数据
      getNcov(params) {
        return axios.get(base.ncov, {
          params,
        });
      },
      // 省市数据
      getNocvCity() {
        return axios.get(base.ncovcity);
      },
    };
    ```
25. 在 AllMap.vue 中引入 api
    ```js
    import api from "../api";
    ```
26. 修改方法
    ```js
    mounted () {
    api.getNcovCity().then(res => {
      console.log(res.data);
      this.$charts.chinaMap("chinaMap");
    }).catch(error => {
      console.log(error);
    })
    }
    ```
27. chinaMap(id,data)的 data 传给 data 数组匹配数据(补 data 数据)
    ```js
    data: data;
    ```
28. 在 AllMap.vue 中读数据，数据格式为{ name: "内蒙古", value: 10, itemStyle: { normal: { areaColor: "#fff" } } }
29. 在 AllMap.vue 中设置颜色方法
    ```js
    methods: {
    // 根据病例更换颜色方法
    setColor (value) {
      let currentColor = "";
      switch (true) {
        case value == 0:
          currentColor = "#fff";
          break;
        case value > 0 && value < 10:
          currentColor = "#FDFDCF";
          break;
        case value >= 10 && value < 100:
          currentColor = "#FE9E83";
          break;
        case value >= 100 && value < 500:
          currentColor = "#E55A4E";
          break;
        case value > 500 && value < 10000:
          currentColor = "#4F070D";
          break;
      }
      return currentColor
    }
    }
    ```
30. 在 AllMap.vue 中过滤数据
    ```js
    mounted () {
    api.getNcovCity().then(res => {
      // 读取数据，数据格式：{ name: "内蒙古", value: 10, itemStyle: { normal: { areaColor: "#fff" } } }
      // 声明
      var allCities = [];
      for (var i = 0; i < res.data.retdata.length; i++) {
        var temp = {
          name: res.data.retdata[i].xArea,
          value: res.data.retdata[i].curConfirm, // 当前确诊
          itemStyle: {
            normal: {
              areaColor: this.setColor(res.data.retdata[i].curConfirm),
            }
          }
        }
        // 每遍历一次，push一次数据
        allCities.push(temp)
      }
      this.$charts.chinaMap("chinaMap", allCities);
    }).catch(error => {
      console.log(error);
    })
    },
    ```
31. 在 echarts.js 文件的参数中规范提示信息
    ```js
    triggerOn: "click",
    enterable: true,
    tooltip: {
        // formatter(格式化)函数可以用来对渲染在单元格中的数据做操作
        formatter(data) {
            return "<div><p>" + data.seriesName + "：" + data.name + "</p><p>现存确诊：" + data.value + "</p></div>"
        }
    },
    ```
32. 在 echarts.js 文件的参数下通过 echarts 地图映射方法，确定地区颜色
    ```js
    visualMap: [{
        orient: "vertical", // 垂直
        type: "piecewise", // 分段
        pieces: [
            { min: 0, max: 0, color: "#fff" },
            { min: 1, max: 10, color: "#FDFDCF" },
            { min: 10, max: 100, color: "#FE9E83" },
            { min: 100, max: 1000, color: "#E55A4E" },
            { min: 1000, max: 10000, color: "#85000E" },
            { min: 10000, color: "#4F070D" }
        ],
    }],
    ```
33. 注射掉在 AllMap.vue 文件里面的划分颜色操作
    // itemStyle: {
    // normal: {
    // areaColor: this.setColor(res.data.retdata[i].curConfirm),
    // }
    // }

    // methods: {
    // // 根据病例更换颜色方法
    // setColor (value) {
    // let currentColor = "";
    // switch (true) {
    // case value == 0:
    // currentColor = "#fff";
    // break;
    // case value > 0 && value < 10:
    // currentColor = "#FDFDCF";
    // break;
    // case value >= 10 && value < 100:
    // currentColor = "#FE9E83";
    // break;
    // case value >= 100 && value < 500:
    // currentColor = "#E55A4E";
    // break;
    // case value > 500 && value < 10000:
    // currentColor = "85000E";
    // break;
    // case value > 10000:
    // currentColor = "#4F070D";
    // break;
    // }
    // return currentColor
    // }
    // }

34. 封装 tabs
    - 主要看 vue-tabs
35. 引入 tabs，将 vue-tabs 里的 tabs 文件夹引入到 components 文件夹内，最后在 main.js 中引入使用
    ```js
    import Tabs from "./components/tabs";
    Vue.use(Tabs);
    ```
36. 地图部分分国内和国外两部分
    36.1 在 AllMap.vue 中书写
    ```html
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
    ```
    ```js
    data () {
    return {
      currentIndex: "1"
    }
    },
    methods: {
    getIndex (index) {
      this.currentIndex = index
    }
    }
    ```
    ```css
    #worldMap {
      width: 375px;
      height: 400px;
    }
    ```
    36.2 处理切换回来不显示问题(contentName.vue 中对切换内容的处理是移除，要改成隐藏)
    ```js
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
    ```
37. 世界地图的完成
    37.1 在 main.js 文件中引入世界地图
    ```js
    import "../node_modules/echarts/map/js/world";
    ```
    37.2 在 echarts.js 中添置世界地图的配置
    ```js
    worldMap(id) {
        var myEcharts = echarts.init(document.getElementById(id));
        var option = {
            // 参数
            // 提示信息
            triggerOn: "click", // 点击
            enterable: true,
            tooltip: {
                // formatter(格式化)函数可以用来对渲染在单元格中的数据做操作
                formatter(data) {
                    return "<div><p>" + data.name + "</p><p>现存确诊：" + data.value + "</p></div>"
                }
            },
            // echarts地图映射 颜色值
            visualMap: [{
                orient: "vertical", // 垂直
                type: "piecewise", // 分段式
                // 配置颜色区间
                pieces: [
                    { min: 0, max: 0, color: "#FFFFFF" },
                    { min: 1, max: 10000, color: "#FDFDCF" },
                    { min: 10000, max: 500000, color: "#FE9E83" },
                    { min: 500000, max: 5000000, color: "#E55A4E" },
                    { min: 5000000, color: "#4F070D" }
                ],
            }],
            // 资源配置
            series: [{
                name: "世界地图", // 世界地图
                type: "map", // 地图类型
                map: "world",
                roam: true, //是否允许自动缩放
                zoom: 1.2, // 地图缩放比例
                label: { // 配置颜色、字体等属性
                    normal: {
                        show: false, // 显示地图名字
                        textStyle: { // 文字样式
                            fontSize: 8
                        }
                    }
                },
                // 映射关系
                nameMap: nameMap,
                // 地图样式配置
                itemStyle: {
                    normal: {
                        areaColor: 'rgba(0,255,236,0)', // 区域颜色
                        borderColor: 'rgba(0,0,0,0.2)', // 边框颜色
                    },
                    emphasis: { // 阴影数据效果
                        areaColor: 'rgba(255,180,0,0.8)',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                    }
                },
                // 匹配数据 data数组,由chinaMap(id,data)的data传过来
                data: data
            }]
        }
        myEcharts.setOption(option);
    }
    ```
    37.3 在 AllMap.vue 里面加载世界地图
    ```js
    this.$charts.chinaMap("chinaMap", allCities);
    this.$charts.worldMap("worldMap");
    ```
    37.4 给世界地图提供数据
    37.4.1 在 plugins 文件夹中添加 name.js 文件（国家名字匹配）
    37.4.2 在 echarts.js 文件中导入 name.js 文件
    ```js
    import nameMap from "./name";
    ```
    37.4.3 在 echarts.js 文件中 worldMap 中的参数加入国家名字映射关系
    ```js
    nameMap: nameMap,
    ```
    37.4.4 在 api 中的 index.js 中添加接口
    ```js
    const base = {
      ncov: "http://api.tianapi.com/ncov/index", // 具体路径
      ncovcity: "api/covid19-server/json/china.json", // 省市数据
      ncovabroad: "https://apis.tianapi.com/ncovabroad/index", //国际数据
    };
    ```
    ```js
    getNcovabroad(params) {
        return axios.get(base.ncovabroad, {
            params
        })
    }
    ```
    37.4.5 在 AllMap.vue 中合并网络请求
    ```js
    import axios from "axios";
    ```
    ```js
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
    ```
    37.4.6 将数据传入 echarts.js
    ```js
    worldMap(id,data) {
        var myEcharts = echarts.init(document.getElementById(id));
        var option = {
             // 参数
             // 提示信息
             triggerOn: "click", // 点击
             enterable: true,
             tooltip: {
                 // formatter(格式化)函数可以用来对渲染在单元格中的数据做操作
                 formatter(data) {
                     return "<div><p>" + data.name + "</p><p>现存确诊：" + data.value + "</p></div>"
                 }
             },
             // echarts地图映射 颜色值
             visualMap: [{
                 orient: "vertical", // 垂直
                 type: "piecewise", // 分段式
                 // 配置颜色区间
                 pieces: [
                     { min: 0, max: 0, color: "#FFFFFF" },
                     { min: 1, max: 10000, color: "#FDFDCF" },
                     { min: 10000, max: 500000, color: "#FE9E83" },
                    { min: 500000, max: 5000000, color: "#E55A4E" },
                    { min: 5000000, color: "#4F070D" }
                ],
             }],
            // 资源配置
             series: [{
                name: "世界地图", // 世界地图
                type: "map", // 地图类型
                 map: "world",
                roam: true, //是否允许自动缩放
                zoom: 1.2, // 地图缩放比例
                label: { // 配置颜色、字体等属性
                    normal: {
                        show: false, // 显示地图名字
                        textStyle: { // 文字样式
                            fontSize: 8
                        }
                    }
                },
                // 映射关系
                nameMap: nameMap,
                // 地图样式配置
                itemStyle: {
                    normal: {
                        areaColor: 'rgba(0,255,236,0)', // 区域颜色
                        borderColor: 'rgba(0,0,0,0.2)', // 边框颜色
                    },
                    emphasis: { // 阴影数据效果
                        areaColor: 'rgba(255,180,0,0.8)',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                    }
                },
                // 匹配数据 data数组,由chinaMap(id,data)的data传过来
                data: data
             }]
        }
         myEcharts.setOption(option);
    }
    ```

## 加载第三方 Swiper——轮播图组件 - 详细查看 vue-swiper-demo

## 轮播图实现

1. 安装依赖
   > npm install swiper@6.4.7 vue-awesome-swiper@4.1.1 --save
2. 启动项目
   > npm run serve
3. 创建公共组件 MySwiper.vue 文件
4. 在 HomeView.vue 文件中引入并使用 MySwiper.vue 文件
   ```js
   import MySwiper from "../components/MySwiper.vue"
   components: {
    Header,
    Covid19Info,
    CaseNum,
    AllMap,
    MySwiper
   },
   ```
   ```html
   <MySwiper />
   ```
5. 补全轮播图
   5.1 在 MySwiper.vue 中初始化声明轮播图
   ```js
   data () {
    return {
      // 初始化声明轮播图图片
      swiperData: [
        "https://img1.dxycdn.com/2020/0220/014/3397684583507458039-135.png",
        "https://img1.dxycdn.com/2020/0220/697/3397684611424536901-135.png",
        "https://img1.dxycdn.com/2020/0220/861/3397684624309439853-135.png",
        "https://img1.dxycdn.com/2020/0220/168/3397686703073768694-135.png",
        "https://img1.dxycdn.com/2020/0220/709/3397686724548816431-135.png"
      ]
    }
   },
   ```
   5.2 具体代码
   ```js
   <template>
   <div class="chart">
    <h3 class="title">全国</h3>
    <swiper ref="mySwiper" :options="swiperOption">
      <!-- 动态生成：用v-for对图片进行遍历 -->
      <swiper-slide v-for="(item,index) in swiperData" :key="index">
        <img :src="item.image" alt="">
      </swiper-slide>
    </swiper>
    <!-- 指示器部分 -->
    <ul class="navigator">
      <!-- li标签做文本循环处理操作 高亮处理 点击事件 -->
      <li class="navigatorItem" :class="{'active':index === currentIndex}" @click="clickHandle(index)" v-for="(item,index) in swiperData" :key="index">
        {{item.title}}
      </li>
    </ul>
   </div>
   </template>
   <script>
   import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
   import "swiper/swiper-bundle.css";
   export default {
   data () {
    let that = this;
    return {
      // 根据下标进行切换
      currentIndex: 0,
      // 初始化声明轮播图图片
      swiperData: [
        {
          image: "https://img1.dxycdn.com/2020/0220/014/3397684583507458039-135.png",
          title: "新增疑似/新增确诊"
        },
        {
          image: "https://img1.dxycdn.com/2020/0220/697/3397684611424536901-135.png",
          title: "现存确诊/现存疑似"
        },
        {
          image: "https://img1.dxycdn.com/2020/0220/861/3397684624309439853-135.png",
          title: "死亡/治愈"
        },
        {
          image: "https://img1.dxycdn.com/2020/0220/168/3397686703073768694-135.png",
          title: "病死率"
        },
        {
          image: "https://img1.dxycdn.com/2020/0220/709/3397686724548816431-135.png",
          title: "治愈率"
        },
      ],
      // swiper配置选项
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        // 获取轮播图下标
        on: {
          slideChangeTransitionEnd: function () {
            // console.log(this.activeIndex);
            // 改变currentIndex的值,这里的this和data的this不一样
            that.currentIndex = this.activeIndex
          }
        }
      }
    }
   },
   components: {
    Swiper,
    SwiperSlide,
    // Autoplay,
   },
   directives: {
    swiper: directive,
   },
   computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper;
    },
   },
   methods: {
    // 点击事件
    clickHandle (index) {
      // 高亮改变
      this.currentIndex = index
      // 切换轮播图
      this.swiper.slideTo(index, 1000, false);
    }
   },
   }
   </script>
   <style scoped>
   /* 样式 */
   .line {
   padding: 0 10px;
   width: 100%;
   height: 300px;
   }
   .chart {
   position: relative;
   background: #fff;
   padding: 0.16rem 0;
   }
   .chart .title {
   font-size: 0.16rem;
   margin: 0 0 0.08rem 0.16rem;
   }
   .chart .swiper-pagination {
   position: absolute;
   text-align: center;
   -webkit-transition: 300ms opacity;
   -o-transition: 300ms opacity;
   transition: 300ms opacity;
   -webkit-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
   z-index: 10;
   }
   .chart .swiper-pagination-bullet {
   width: calc(20% - 0.02rem);
   text-align: center;
   background: #f7f7f7;
   padding: 0.045rem;
   box-sizing: border-box;
   color: #666;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 0.02rem;
   }
   .navigator {
   font-size: 0.12rem;
   list-style: none;
   display: flex;
   padding: 0 0.16rem;
   justify-content: center;
   margin: 0.06rem 0 0;
   }
   .navigatorItem {
   color: #4169e2;
   background: #f1f5ff;
   position: relative;
   width: calc(20% - 0.02rem);
   text-align: center;
   background: #f7f7f7;
   padding: 0.045rem;
   box-sizing: border-box;
   color: #666;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 0.02rem;
   margin-left: 0.025rem;
   }
   .active {
   color: #4169e2;
   background: #f1f5ff;
   position: relative;
   }
   </style>
   ```

## 省市具体地图数据

1. 在 view 里面新建 CityView.vue 文件
2. 在路由界面设置跳转到该页面
   ```js
   const routes = [
     {
       path: "/",
       name: "home",
       component: HomeView,
     },
     {
       path: "/city",
       name: "City",
       component: () => import("../views/CityView.vue"),
     },
   ];
   ```
3. 实现点击地图黑框进 city 页面
   3.1 在 echarts.js 中的中国地图模块添加以下代码(嵌套 a 标签)
   ```js
   tooltip: {
   triggerOn: "click", // 点击
   enterable: true,
   // formatter(格式化)函数可以用来对渲染在单元格中的数据做操作
   formatter(data) {
   return "<div><p>" + data.name + "</p><p>现存确诊：" + data.value + "</p></div>
   <a href='/#/city' style='color=#fff'>详细信息></a>"
   }
   },
   ```
   3.2 分别在 router 中的 index.js 中和、echarts.js 中的中国地图模块、cityview.vue，通过传参确定用户点击哪个省份
   ```js
   1
   const routes = [
     {
       path: "/",
       name: "home",
       component: HomeView,
     },
     {
       path: "/city/:city",
       name: "City",
       component: () => import("../views/CityView.vue"),
       props: true
     },
   ];
   2
   formatter(data) {
      return "<div><p>" + data.name + "</p><p>现存确诊：" + data.valuehref='/#/city" + data.name + "' style='color:#fff'>详细信息 ></a>"
   }
   <template>
   <div>
    城市:{{city}}
   </div>
   3
   </template>
   <script>
   export default {
   props: {
    city: {
      type: String,
      default: ""
    }
   }
   }
   </script>
   ```
   3.3 在 main.js 中引进各省地图
   3.4 显示各省地图
   3.4.1 在 echart.js 中加载地图
   ```js
   provinceMap(id, cityName) {
      var myEcharts = echarts.init(document.getElementById(id))
      var option = {
          // echarts地图映射 颜色值
          visualMap: [{
              orient: "vertical", // 垂直
              type: "piecewise", // 分段式
              // 配置颜色区间
              pieces: [
                  { min: 0, max: 0, color: "#FFFFFF" },
                  { min: 1, max: 10, color: "#FDFDCF" },
                  { min: 10, max: 100, color: "#FE9E83" },
                  { min: 100, max: 500, color: "#E55A4E" },
                  { min: 500, max: 10000, color: "#85000E" },
                  { min: 10000, color: "#4F070D" }
              ],
          }],
          // 资源配置
          series: [{
              name: "市", // 中国地图，里面匹配省
              type: "map", // 地图类型
              map: cityName, // 必须为中文
               roam: true, //是否允许自动缩放
              zoom: 1.2, // 地图缩放比例
              label: { // 配置颜色、字体等属性
                  normal: {
                      show: true, // 显示字体
                      textStyle: { // 文字样式
                          fontSize: 8
                      }
                  }
              },
              // 地图样式配置
              itemStyle: {
                  normal: {
                      areaColor: 'rgba(0,255,236,0)', // 区域颜色
                      borderColor: 'rgba(0,0,0,0.2)', // 边框颜色
                  },
                  emphasis: { // 阴影数据效果
                      areaColor: 'rgba(255,180,0,0.8)',
                       shadowOffsetX: 0,
                      shadowOffsetY: 0,
                       shadowBlur: 20,
                       borderWidth: 0,
                   }
               },
               // 匹配数据 data数组,由chinaMap(id,data)的data传过来
               // data: data
           }]
       }
       myEcharts.setOption(option);
   }
   ```
   3.4.2 在 city.vue 中导入数据
   ```js
   <template>
   <div>
    城市: {{city}}
    <div id="city"></div>
   </div>
   </template>
   <script>
   export default {
   props: {
    city: {
      type: String,
      default: ""
    }
   },
   mounted () {
    this.$charts.provinceMap("city", this.city)
   }
   }
   </script>
   <style scoped>
   #city {
   width: 375px;
   height: 650px;
   }
   </style>
   ```
   3.5 省份数据设配
   3.5.1 在 cityView 中获取数据
   ```js
   mounted () {
    var citys = [];
    axios.get("api/covid19-server/json/china.json").then(res => {
      if (res.status === 200) {
        for (var i = 0; i < res.data.retdata.length; i++) {
          if (res.data.retdata[i].xArea === this.city) {
            for (var j = 0; j < res.data.retdata[i].subList
              .length; j++) {
              var temp = {
                name: res.data.retdata[i].subList[j].city+"市",
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
   ```
   3.5.2 在 echart.js 中获得 data 数据

## vant UI 框架引入

1. Vue 2 项目，安装 Vant 2
   - Vue 2 项目，安装 Vant 2
2. 引入组件（自动按需引入组件）
   2.1 安装插件
   npm i babel-plugin-import -D
   2.2 在 babel.config.js 中添加配置
   ```js
   module.exports = {
     plugins: [
       [
         "import",
         {
           libraryName: "vant",
           libraryDirectory: "es",
           style: true,
         },
         "vant",
       ],
     ],
   };
   ```
3. 新建 SpringTravel.vue 组件
   ```js
   <template>
   <div class="spring">
    <h3 class="title">春节旅行各地政策</h3>
   </div>
   </template>
   <script>
   export default {
   }
   </script>
   <style scoped>
   .spring {
   width: 100%;
   height: 300px;
   background: #fff;
   }
   .spring .title {
   font-size: 0.16rem;
   margin: 0 0 0.08rem 0.16rem;
   }
   </style>
   ```
4. 写在首页，所以在 HomeView.vue 中引入使用
   ```js
   import SpringTravel from "../components/SpringTravel.vue";
   components: {
    Header,
    Covid19Info,
    CaseNum,
    AllMap,
    MySwiper,
    SpringTravel
   },
   ```
   ```html
   <SpringTravel />
   ```
5. 在 plugins 中创建 vant.js 文件，引入组件
   ```js
   import Vue from "vue";
   import { Cascader, Field, Popup, Button } from "vant";
   Vue.use(Cascader);
   Vue.use(Field);
   Vue.use(Popup);
   Vue.use(Button);
   ```
6. 在 main.js 中引入 vant.js 文件
   ```js
   import "./plugins/vant";
   ```
7. 在 components 目录下新建 Cascader.vue 文件，用来封装组件以达到复用的效果
   ```js
   <template>
   <div>
    <van-field v-model="City" is-link readonly :label="label" placeholder="请选择所在地区" @click="show = true" />
    <van-popup v-model="show" round position="bottom">
      <van-cascader title="请选择所在地区" :options="options" @close="show = false" @finish="onFinish" />
    </van-popup>
   </div>
   </template>
   <script>
   export default {
   data () {
    return {
      show: false,
      City: "",
      cascaderValue: "",
    };
   },
   props: {
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    label: {
      type: String,
      default: ""
    }
   },
   methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish ({ selectedOptions }) {
      this.show = false;
      this.City = selectedOptions
        .map((option) => option.text)
        .join("/");
      this.$emit("onValue", selectedOptions[1])
    }
   },
   };
   </script>
   <style>
   </style>
   ```
8. 在 SpringTravel.vue 中引用并使用 Cascader.vue 组件(组件的复用)，与其他代码
   ```js
   <template>
   <div class="spring">
    <h3 class="title">春节旅行各地政策</h3>
    <Cascader :options="options" label="出发城市" @onValue="getgoCity" />
    <Cascader :options="options" label="到达城市" @onValue="getonCity" />
    <van-button type="info" block @click="gotoSpringView">查看政策</van-button>
   </div>
   </template>
   <script>
   import api from "../api";
   import Cascader from "./CascaderName.vue"
   export default {
   data () {
    return {
      options: [],
      citys: []
    };
   },
   components: {
    Cascader
   },
   mounted () {
    api.springTravel({
      key: "171e165a7d991c5f6ecd5194c54778ef",
    }).then((res) => {
      var currentAll = [];
      if (res.status === 200) {
        for (var i = 0; i < res.data.result.length; i++) {
          var arr = [];
          for (var j = 0; j < res.data.result[i].citys.length; j++) {
            var temp2 = {
              text: res.data.result[i].citys[j].city,
              value: res.data.result[i].citys[j].city_id,
            };
            arr.push(temp2);
          }
          var temp1 = {
            text: res.data.result[i].province,
            value: res.data.result[i].province_id,
            children: arr,
          };
          currentAll.push(temp1);
        }
        this.options = currentAll;
      }
    });
   },
   methods: {
    getgoCity (data) {
      this.citys.push(data)
    },
    getonCity (data) {
      this.citys.push(data)
    },
    gotoSpringView () {
      if (this.citys.length === 2) {
        this.$router.push({ name: "SpringView", params: { citys: this.citys } })
      } else {
        this.$notify({ type: 'danger', message: '请选择城市' });
      }
    }
   }
   };
   </script>
   <style scoped>
   .spring {
   width: 100%;
   background: #fff;
   padding: 10px;
   box-sizing: border-box;
   }
   .spring .title {
   font-size: 0.16rem;
   margin: 0 0 0.08rem 0.16rem;
   }
   </style>
   ```
9. 城市数据 api
   9.1 在 api 中的 index.js 中新增 api 路径和调用方法
   ```js
   juheBaseUrl: "http://apis.juhe.cn",
   Travel: "/springTravel/citys"
   Travel(params) {
        return axios.get(base.juheBaseUrl + base.Travel, {
            params
        })
    }
   ```
   9.2 在 springTravel 中引入并调用方法
   ```js
   import api from "../api";
   mounted () {
    api.springTravel({
      key: "9e2a7aba4f86274dfea0ebb938fb112b"
    }).then(res => {
      console.log(res.data);
    })
   },
   ```
   9.3 在 vue.config.js 中解决跨域问题
   ```js
   '/apis': {
        target: 'http://apis.juhe.cn',
        changeOrigin: true,
        pathRewrite: {
            "^/apis": ""
        }
     },
   ```

## 各地进出政策

1. 在 views 中创建 SpringView.vue 文件
2. 加入路由
   ```js
   {
    path: '/spring',
    name: 'SpringView',
    component: () =>
        import ("../views/SpringView.vue"),
    props: true
   }
   ```
3. 在 SpringTravel.vue 文件中的 button 组件引入按钮事件
   ```html
   <van-button type="info" block @click="gotoSpringView">查看政策</van-button>
   ```
   ```js
   gotoSpringView () {
      if (this.citys.length === 2) {
        this.$router.push({ name: "SpringView", params: { citys: this.citys } })
      } else {
        this.$notify({ type: 'danger', message: '请选择城市' });
      }
    }
   ```
4. 出行政策 api
   4.1 在 api 中的 index.js 写以下代码
   ```js
   springTravelQuery: "/springTravel/query";
   springTravelQuery(params) {
        return axios.get(base.juheBaseUrl + base.springTravelQuery, {
            params
        })
    }
   ```
   4.2 在 springView.vue 视图中引入并使用网络请求
   ```js
   import api from "../api"
   mounted () {
    api.springTravelQuery({
      key: "171e165a7d991c5f6ecd5194c54778ef",
      // 指定出发和到达城市
      from: this.citys[0].value,
      to: this.citys[1].value
    }).then(res => {
      console.log(res.data);
    })
   }
   ```
   4.3 其他看代码

## 打包上传服务器

1. 打包命令

```js
npm run build
```

2. 打包后预览

```js
npm install -g serve
serve -s dist
```

3. 跨域问题

- 开发环境
  开发环境下的跨域处理，只能在开发环境下运行，打包之后是不能运行的
  proxy 都是开发环境跨域
- 生产环境 所以跨域一般会让后台解决
  cors（主要）
  jsonp

4. 打包路径问题
