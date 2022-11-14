import axios from "../utils/request"

// 给axios请求设置相应设置
const base = {
    ncov: "http://api.tianapi.com/ncov/index", // 具体路径
    ncovcity: "api/covid19-server/json/china.json", // 省市数据
    ncovabroad: "https://apis.tianapi.com/ncovabroad/index", //国际数据
    juheBaseUrl: "/apis1",
    springTravel: "/springTravel/citys",
    springTravelQuery: "/springTravel/query"
}

const api = {
    /**
     * 疫情数据
     */
    getNcov(params) {
        return axios.get(base.ncov, {
            params
        })
    },
    /**
     * 省市数据
     */
    getNcovCity() {
        return axios.get(base.nocvcity)
    },
    /** 
     * 国际数据 
     */
    getNcovabroad(params) {
        return axios.get(base.ncovabroad, {
            params
        })
    },
    /**
     * 防疫各地名称数据
     */
    springTravel(params) {
        return axios.get(base.juheBaseUrl + base.springTravel, {
            params
        })
    },
    /**
     * 防疫各地政策数据
     */
    springTravelQuery(params) {
        return axios.get(base.juheBaseUrl + base.springTravelQuery, {
            params
        })
    }
}

// 导出api
export default api;