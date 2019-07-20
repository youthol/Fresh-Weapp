// pages/form/form.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

    popupShow: true,
    sexColumns: [
      {
        id: 1,
        sex: '男'
      },
      {
        id: 2,
        sex: '女'
      },
      {
        id: 3,
        sex: '未知🤔'
      }
    ]
  },

  // 展示弹出层
  onPopupShow() {
    this.setData({ popupShow: true });
  },

  // 关闭弹出层
  onClose() {
    this.setData({ popupShow: false });
  },

  // 取消选择
  onSexConcel() {
    this.onClose();
  },

  // 确认选择
  onSexConfirm() {
    this.onClose();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})