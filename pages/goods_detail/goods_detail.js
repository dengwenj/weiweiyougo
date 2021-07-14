import { getGoodsDetail } from "../../api/goods"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {} // 商品详情 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { goods_id } = options
    this._getGoodsDetail(goods_id)
  },

  // 获取商品详情数据
  async _getGoodsDetail(goods_id) {
    const res = await getGoodsDetail({ goods_id })
    const goodsDetail = res.data.message
    this.setData({
      goodsDetail: {
        //小程序中建议 data 里面只存放标签中要使用的数据
        goods_price: goodsDetail.goods_price,
        goods_name: goodsDetail.goods_name,
        goods_introduce: goodsDetail.goods_introduce.replace(/webp/g, 'jpg'),
        pics: goodsDetail.pics
      }
    })
  }
})