// pages/intro/intro.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    popupShow: false,
    departmentList: [
      {
        id: 1,
        department: "综合部",
        ani: null
      },
      {
        id: 2,
        department: "媒体中心",
        ani: null
      },
      {
        id: 3,
        department: "新闻部",
        ani: null
      },
      {
        id: 4,
        department: "技术部-程序",
        ani: null
      },
      {
        id: 5,
        department: "技术部-美工",
        ani: null
      },
      {
        id: 6,
        department: "技术部-闪客",
        ani: null
      },
      {
        id: 7,
        department: "摄影小组",
        ani: null
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

  // 动画函数
  showAni: function() {
    for (let i = 0; i < 7; i++) {
      const ani = wx.createAnimation({
        duration: 500,
        delay: i * 70 + 200,
        timingFunction: "ease"
      });
      ani
        .opacity(1)
        .translateY(0)
        .step();

      const newList = this.data.departmentList;
      newList[i].ani = ani.export();
      this.setData({
        departmentList: newList
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(this.data.btnAni);
    this.showAni();
    console.log(this.data.btnAni);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
