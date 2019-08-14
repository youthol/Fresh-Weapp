// pages/form/form.js
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify.js';


Page({
  /**
   * 页面的初始数据
   */
  data: {
    notice: '报名时间为 2019-9-1 至 2019-10-1。',
    noticeShow: true,
    name: null,
    nb: null,
    phone: null,
    email: null,
    class: null,
    intro: null,
    errorState: {
      name: false,
      nb: false,
      phone: false,
      email: false,
      class: false,
      intro: false
    },
    submitState: false,
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
      sex: "男👨‍🎓"
    },
    {
      id: 1,
      sex: "女👩‍🎓"
    },
    {
      id: 2,
      sex: "外星人👀"
    }
    ],
    departmentColumns1: [{
      id: 0,
      department: "请选择第一意向部门"
    },
    {
      id: 1,
      department: "综合部"
    },
    {
      id: 2,
      department: "媒体中心"
    },
    {
      id: 3,
      department: "新闻记者部"
    },
    {
      id: 4,
      department: "品牌运营部"
    },
    {
      id: 5,
      department: "技术支持部-程序"
    },
    {
      id: 6,
      department: "技术支持部-美工"
    },
    {
      id: 7,
      department: "技术支持部-闪客"
    },
    {
      id: 8,
      department: "摄影小组"
    }
    ],
    departmentColumns2: [{
      id: 0,
      department: "请选择第二意向部门"
    },
    {
      id: 1,
      department: "综合部"
    },
    {
      id: 2,
      department: "媒体中心"
    },
    {
      id: 3,
      department: "新闻记者部"
    },
    {
      id: 4,
      department: "品牌运营部"
    },
    {
      id: 5,
      department: "技术支持部-程序"
    },
    {
      id: 6,
      department: "技术支持部-美工"
    },
    {
      id: 7,
      department: "技术支持部-闪客"
    },
    {
      id: 8,
      department: "摄影小组"
    }
    ]
  },

  // 设置表单数据
  setFormData(e) {
    this.setData({
      [e.target.dataset.id]: e.detail
    })
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
      collegePickerShow: false,
      departmentPickerShow1: false,
      departmentPickerShow2: false
    });
  },

  // 改变性别选择框选值
  changeSex(e) {
    const value = e.detail.value[0];
    this.setData({
      sexValue: [value]
    });
  },

  // 打开部门选择器
  onDepartmentPopupShow(e) {
    if (e.target.dataset.id === "1") {
      this.setData({
        sexPickerShow: false,
        collegePickerShow: false,
        departmentPickerShow1: true,
        departmentPickerShow2: false
      });
    } else {
      this.setData({
        sexPickerShow: false,
        collegePickerShow: false,
        departmentPickerShow1: false,
        departmentPickerShow2: true
      });
    }
    this.onPopupShow();
  },

  // 改变部门选值
  changeDepartment(e) {
    const value = e.detail.value[0];
    if (e.target.dataset.id === "1") {
      this.setData({
        departmentValue1: [value]
      });
    } else {
      this.setData({
        departmentValue2: [value]
      });
    }
  },

  // 打开学院选择器
  onCollegePopupShow() {
    this.onPopupShow();
    this.setData({
      sexPickerShow: false,
      collegePickerShow: true,
      departmentPickerShow1: false,
      departmentPickerShow2: false
    });
  },

  // 改变学院选择框选值
  changeCollege(e) {
    const value = e.detail.value[0];
    this.setData({
      collegeValue: [value]
    });
  },

  // 获取宿舍信息
  getCollege() {
    wx.request({
      url: "https://youthapi.sdut.edu.cn/api/college",
      success: res => {
        if (res.statusCode === 200 && res.data) {
          this.setData({
            college: res.data.data
          });
        }
      },
      fail: () => { }
    });
  },

  // 验证表单
  checkForm(data) {
    // 遍历data对象，检测是否为空，
    // 邮箱和第二志愿可以空，但只有email的值为null
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        console.log(element);
        
        if (element === null && key !== "email") {
          console.log(key);
          
          return {
            type: "error",
            msg: "empty",
            index: key
          };
        };
      };
    };

    // 检测第一志愿的值是否为有效值
    if (data.part_1 === 0) {
      return {
        type: "error",
        msg: "第一志愿的值无效！"
      };
    } else if (data.part_2 === data.part_1) {
      return {
        type: "error",
        msg: "第一志愿和第二志愿不能相同！"
      };
    };

    return {
      type: 'success'
    }
  },

  // 提交表单
  submitForm() {

    // 表单数据
    const data = {
      name: this.data.name,
      sex: this.data.sexValue[0],
      nb: this.data.nb,
      phone: this.data.phone,
      email: this.data.email,
      college: this.data.collegeValue[0],
      class: this.data.class,
      part_1: this.data.departmentValue1[0],
      part_2: this.data.departmentValue2[0],
      introduction: this.data.intro
    };

    const result = this.checkForm(data);
    if (result.type === 'error') {

      switch (result.msg) {
        case "empty":
          this.setData({
            errorState: {
              ...this.data.errorState,
              [result.index]: true
            }
          })
          Notify({
            text: '请将信息填写完整！',
            duration: 1000,
            selector: '#error-notify',
            backgroundColor: '#ed4014'
          });
          return;
      
        default:
          break;
      }
      

    }

    wx.request({
      url: "https://youthapi.sdut.edu.cn/api/service/recruit",
      // url: "http://localhost/api/service/recruit",
      method: "POST",
      data: data,
      seccess: (res) => {
        res.data
      },
      fail: () => { }
    });
  },

  cancelError(e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollege();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
});