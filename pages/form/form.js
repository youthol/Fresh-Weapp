// pages/form/form.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    popupShow: false,
    sexPickerShow: false,
    departmentPickerShow: true,
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
    ],
    departmentColumns: [
      {
        id: 1,
        department: '综合部'
      },
      {
        id: 2,
        department: '媒体中心'
      },
      {
        id: 3,
        department: '新闻部'
      },
      {
        id: 4,
        department: '技术部-程序'
      },
      {
        id: 5,
        department: '技术部-美工'
      },
      {
        id: 6,
        department: '技术部-闪客'
      },
      {
        id: 7,
        department: '摄影小组'
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

  // 取消性别选择器
  onSexConcel() {
    this.onClose();
  },

  // 确认性别选择器
  onSexConfirm() {
    this.onClose();
  },

  // 取消性别选择器
  onDepartmentConcel() {
    this.onClose();
  },

  // 确认性别选择器
  onDepartmentConfirm() {
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