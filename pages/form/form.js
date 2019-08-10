// pages/form/form.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    popupShow: false,
    sexPickerShow: false,
    collegePickerShow: false,
    departmentPickerShow1: false,
    departmentPickerShow2: false,
    sexValue: [0],
    collegeValue: [0],
    departmentValue1: [0],
    departmentValue2: [0],
    college: [],
    sexColumns: [{
        id: 0,
        sex: '男👨‍🎓'
      },
      {
        id: 1,
        sex: '女👩‍🎓'
      },
      {
        id: 2,
        sex: '外星人👀'
      }
    ],
    departmentColumns1: [{
        id: 0,
        department: '请选择第一意向部门'
      },
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
        department: '新闻记者部'
      },
      {
        id: 4,
        department: '品牌运营部'
      },
      {
        id: 5,
        department: '技术支持部-程序'
      },
      {
        id: 6,
        department: '技术支持部-美工'
      },
      {
        id: 7,
        department: '技术支持部-闪客'
      },
      {
        id: 8,
        department: '摄影小组'
      }
    ],
    departmentColumns2: [{
        id: 0,
        department: '请选择第二意向部门'
      },
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
        department: '新闻记者部'
      },
      {
        id: 4,
        department: '品牌运营部'
      },
      {
        id: 5,
        department: '技术支持部-程序'
      },
      {
        id: 6,
        department: '技术支持部-美工'
      },
      {
        id: 7,
        department: '技术支持部-闪客'
      },
      {
        id: 8,
        department: '摄影小组'
      }
    ]
  },

  // 展示弹出层
  onPopupShow() {
    this.setData({
      popupShow: true
    });
  },

  // 关闭弹出层
  onClose() {
    this.setData({
      popupShow: false
    });
  },

  // 打开性别选择器
  onSexPopupShow() {
    this.onPopupShow();
    this.setData({
      sexPickerShow: true,
      collegePickerShow:false,
      departmentPickerShow1: false,
      departmentPickerShow2: false
    })
  },

  // 改变性别选择框
  changeSex(e) {
    const value = e.detail.value[0];
    this.setData({
      sexValue: [value]
    })
  },

  // 打开部门选择器
  onDepartmentPopupShow(e) {
    if (e.target.dataset.id === "1") {
      this.setData({
        sexPickerShow: false,
        collegePickerShow: false,
        departmentPickerShow1: true,
        departmentPickerShow2: false
      })
    } else {
      this.setData({
        sexPickerShow: false,
        collegePickerShow: false,
        departmentPickerShow1: false,
        departmentPickerShow2: true
      })
    };
    this.onPopupShow();
  },

  // 改变部门
  changeDepartment(e) {
    const value = e.detail.value[0];
    if (e.target.dataset.id === "1") {
      this.setData({
        departmentValue1: [value]
      });
    } else {
      this.setData({
        departmentValue2: [value]
      })
    };
  },

  onCollegePopupShow() {
    this.onPopupShow();
    this.setData({
      sexPickerShow: false,
      collegePickerShow: true,
      departmentPickerShow1: false,
      departmentPickerShow2: false
    })
  },

  // 获取宿舍信息
  getCollege() {
    wx.request({
      url: 'https://youthapi.sdut.edu.cn/api/college',
      success: (res) => {
        if (res.statusCode === 200 && res.data) {
          this.setData({
            college: res.data.data
          })
        }
      },
      fail: () => {

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCollege();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})