import echarts from "echarts"
import nameMap from "./name"

const install = function(Vue) {
    Object.defineProperties(Vue.prototype, {
        $charts: {
            get() {
                return {
                    chinaMap(id, data) {
                        // 初始化echart对象
                        // 将id绑定到echarts身上
                        var myEcharts = echarts.init(document.getElementById(id))
                        var option = {
                                // 参数
                                // 提示信息
                                tooltip: {
                                    triggerOn: "click", // 点击事件类型
                                    enterable: true, // 鼠标可以进入提示浮层
                                    // formatter(格式化)函数可以用来对渲染在单元格中的数据做操作
                                    formatter(data) {
                                        return "<div><p>" + data.name + "</p><p>现存确诊：" + data.value + "</p></div><a href='/#/city/" + data.name + "' style='color:#fff'>详细信息 ></a>"
                                    }
                                },
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
                                    name: "省", // 中国地图，里面匹配省
                                    type: "map", // 地图类型
                                    map: "china", // 中国地图
                                    roam: false, //是否允许自动缩放
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
                                    data: data
                                }]
                            }
                            // 使用
                        myEcharts.setOption(option)
                    },
                    worldMap(id, data) {
                        var myEcharts = echarts.init(document.getElementById(id));
                        var option = {
                            // 参数
                            // 提示信息
                            tooltip: {
                                triggerOn: "click", // 点击
                                enterable: true,
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
                    },
                    provinceMap(id, cityName, data) {
                        var myEcharts = echarts.init(document.getElementById(id))
                        var option = {
                            tooltip: {
                                triggerOn: "click", // 点击
                                enterable: true,
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
                                    { min: 1, max: 10, color: "#FDFDCF" },
                                    { min: 10, max: 100, color: "#FE9E83" },
                                    { min: 100, max: 500, color: "#E55A4E" },
                                    { min: 500, max: 1000, color: "#85000E" },
                                    { min: 1000, max: 10000, color: "#4F070D" }
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
                                data
                            }]
                        }
                        myEcharts.setOption(option);
                    }
                }
            }
        }
    })
}

// 导出
export default install