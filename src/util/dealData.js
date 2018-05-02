/*
 * @Author:      cyzeng
 * @DateTime:    2017-07-31 15:51:50
 * @Description: 公共方法
 */


var n = new Object();
    n.NEUTRAL = '中立';
    n.BUY = '买入';
    n.SELL = '卖出';
    n.STRONG_SELL = '强烈卖出';
    n.STRONG_BUY = '强烈买入';
export default {
    
    
    computeMASignal(e, t){
      var o = n.NEUTRAL;
      return e < t && (o = n.BUY), e > t && (o = n.SELL), o
    },

    computeRSISignal(e, t){
      var o = n.NEUTRAL;
      return e < 30 && t > e && (o = n.BUY),e > 70 && t < e && (o = n.SELL), o
    },

    computeStochSignal(e, t, o, r)
    {
      var i = n.NEUTRAL;
      return e < 20 && t < 20 && e > t && o < r && (i = n.BUY), e > 80 && t > 80 && e < t && o > r && (i = n.SELL), i
    },
    
    
    computeCCI20Signal(e, t) {
      var o = n.NEUTRAL;
      return e < -100 && e > t && (o = n.BUY), e > 100 && e < t && (o = n.SELL), o
    },

    computeADXSignal(e, t, o, r, i) {
      
      var a = n.NEUTRAL;
      return e > 20 && r < i && t > o && (a = n.BUY), e > 20 && r > i && t < o && (a = n.SELL), a
    },

    computeAOSignal(e, t) {
      var o = n.NEUTRAL;
      return (e > 0 && t < 0 || e > 0 && t > 0 && e > t) && (o = n.BUY), (e < 0 && t > 0 || e < 0 && t < 0 && e < t) && (o = n.SELL), o
    },

    computeMomSignal(e, t) {
      var o = n.NEUTRAL;
      return e < t && (o = n.BUY), e > t && (o = n.SELL), o
    },


    computeMACDSignal(e, t) {
      var o = n.NEUTRAL;
      return e > t && (o = n.BUY), e < t && (o = n.SELL), o
    },

    computeBBBuySignal(e, t) {
      var o = n.NEUTRAL;
      return e < t && (o = n.BUY), o
    },
    computeBBSellSignal(e, t) {
      var o = n.NEUTRAL;
      return e > t && (o = n.SELL), o
    },
    computePSARSignal(e, t) {
      var o = n.NEUTRAL;
      return e < t && (o = n.BUY), e > t && (o = n.SELL), o
    },

    /**
     * 指针
     * @param e
     * @param t
       */
    computeRecommendSignal(e) {
      var t = void 0;
      return e >= -1 && e < -.5 && (t = n.STRONG_SELL), e >= -.5 && e < 0 && (t = n.SELL), 0 === e && (t = n.NEUTRAL), e > 0 && e <= .5 && (t = n.BUY), e > .5 && e <= 1 && (t = n.STRONG_BUY), t
    },

    /**
     * @param e
       */
    computeSimpleSignal(e) {
      var t = n.NEUTRAL;
      return -1 === e && (t = n.SELL), 1 === e && (t = n.BUY), t
    }
  
}
