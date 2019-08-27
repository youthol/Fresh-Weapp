import api from "../../http/api";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    popupShow: false, // 是否展示弹出层
    scrollTop: 0, // 弹出层滚动条的位置
    btnAni: null, // 按钮动画
    haveIntro: false, // 是否已拥有介绍的文字
    loadIntro: true, // 是否在加载介绍的文字
    popupContentId: null, // 介绍文字的部门id
    popupContent: null, // 介绍文字的内容
    popupImg: null, // 部门介绍的图片链接
    departmentList: [
      {
        id: 1,
        department: "综合部",
        ani: null,
        intro: null
      },
      {
        id: 2,
        department: "媒体中心",
        ani: null,
        intro: null
      },
      {
        id: 3,
        department: "新闻记者部",
        ani: null,
        intro: null
      },
      {
        id: 4,
        department: "品牌运营部",
        ani: null,
        intro: null
      },
      {
        id: 5,
        department: "技术部-程序",
        ani: null,
        intro: null
      },
      {
        id: 6,
        department: "技术部-美工",
        ani: null,
        intro: null
      },
      {
        id: 7,
        department: "技术部-闪客",
        ani: null,
        intro: null
      },
      {
        id: 8,
        department: "摄影小组",
        ani: null,
        intro: null
      }
    ]
  },

  /**
   * 获取部门简介：
   * 打开加载状态
   * 发送请求
   * 成功：将数据更新至this.data，打开内容存在状态，关闭加载状态，根据环境选择是否渲染文字
   * 失败：关闭加载状态
   */
  getDepartmentIntro(popupContentId) {
    this.setData({
      loadIntro: true
    });

    const weRich = require("we-rich");

    wx.request({
      url: api.departmentIntro,
      success: res => {
        const newList = this.data.departmentList;
        let nodes = null;
        if (res.statusCode === 200 && res.data.data) {
          for (let i = 0; i < res.data.data.length; i++) {
            nodes = weRich.parse(res.data.data[i].intro);
            newList[i].intro = nodes;
          }

          this.setData({
            departmentList: newList,
            haveIntro: true
          });

          // 若popupContentId存在，说明在重新请求的情境下；不存在，则说明在onload内请求，不需要渲染
          if (popupContentId) {
            this.renderContent();
          }
        }
      },
      fail: () => {
        this.setData({
          haveIntro: false,
          loadIntro: false
        });
      }
    });
  },

  /**
   * 渲染介绍文字
   * 抽离该方法是为了区分数据请求所在的情境
   */
  renderContent() {
    const popupContentId = this.data.popupContentId;
    this.setData({
      popupContent: this.data.departmentList[popupContentId - 1].intro,
      popupImg:
        "https://youthlab.sdut.edu.cn/library/2019department/" +
        popupContentId +
        ".png"
    });
  },

  // 展示弹出层
  onPopupShow(e) {
    this.setData({
      popupShow: true,

      popupContentId: parseInt(e.target.id)
    });
    this.renderContent(); // 文字渲染
  },

  // 关闭弹出层
  onClose() {
    this.setData({
      popupShow: false
    });
    const moveToTop = () => {
      this.setData({
        scrollTop: "0px"
      });
    };

    setTimeout(moveToTop, 200);
  },

  // 动画函数
  showAni: function() {
    // 获取部门列表数据
    const newList = this.data.departmentList;
    // 不同部门拥有不同动画
    for (let i = 0; i < 8; i++) {
      const ani = wx.createAnimation({
        duration: 500,
        delay: i * 70 + 200,
        timingFunction: "ease"
      });

      ani
        .opacity(1)
        .translateY(0)
        .step();

      newList[i].ani = ani.export();
    }

    // 开始报名按钮动画
    const btnAni = wx.createAnimation({
      duration: 700,
      delay: 720,
      timingFunction: "ease"
    });

    btnAni.opacity(1).step();

    this.setData({
      btnAni: btnAni.export(),
      departmentList: newList
    });
  },

  toForm: function() {
    wx.navigateTo({
      url: "/pages/form/form"
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDepartmentIntro();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.showAni();
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
