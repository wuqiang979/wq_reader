/*
 * @Description: 自实现移动端上下左右滑动功能
 * @Author: 伍强
 * @Date: 2018-11-19 10:26:09
 * @LastEditTime: 2018-11-19 14:16:39
 * @LastEditors: Please set LastEditors
 */


export default {
  install(Vue, options) {
    /*
     * @Description: touchstart
     */
    let firstOffsetX, firstOffsetY;
    Vue.prototype.zxjq_touch_start = function () {
      document.addEventListener('touchstart', function (e) {
        event.preventDefault();
        event.stopPropagation();
      })
    }
    /*
    * @Description: touchmove
    */
    Vue.prototype.zxjq_touch_move = function (dom) {
      document.addEventListener('touchmove', function (e) {
        event.preventDefault();
      })
    }
    /*
    * @Description: touchend
    */
    Vue.prototype.zxjq_touch_end = function (dom, fn) {
      document.addEventListener('touchend', function (e) {
        event.preventDefault();
      })
    }
    /*
    * @Description: touchleft
    */
    Vue.prototype.zxjq_swipe_left = function (dom, fn) {
      
    }
    /*
    * @Description: touchright
    */
    Vue.prototype.zxjq_swipe_right = function (param) {
        
    }
    /*
    * @Description: touchup
    */
    Vue.prototype.zxjq_swipe_up = function (param) {

    }
    /*
    * @Description: touchdown
    */
    Vue.prototype.zxjq_swipe_down = function (param) {

    }
  }
}
