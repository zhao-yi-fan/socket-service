import { post, fetch, patch, put } from './http.js'
export default {
  install (Vue, options) {
    Vue.prototype._http = { post, fetch, patch, put }, //axios封装请求函数
      Vue.prototype._ali = { //阿里云OSS key参数
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAI8ygujYgDvLJ9',
        accessKeySecret: 'nLrO1bpn9IOpEu0tt0zyAaChc22j0c',
        bucket: 'doutui'
      },
      Vue.prototype._aliurl = 'http://doutui.oss-cn-beijing.aliyuncs.com/', //阿里云拼接路径
      Vue.prototype._ajax = function (url, option, callback) {
        post(url, option).then(resp => {
          callback(resp);
          /* if (resp.state == 1) {
            callback(resp);
          } else {
            Vue.prototype.$message({
              message: resp.message,
              type: 'warning'
            })
          } */
        }, error => {
          /* Vue.prototype.$message({
            message: 'error!',
            type: 'error'
          }) */
        })
      }
  }
}
