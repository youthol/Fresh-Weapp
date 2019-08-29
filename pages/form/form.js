// pages/form/form.js
import Notify from "../../miniprogram_npm/vant-weapp/notify/notify.js";
import api from "../../http/api.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    notice: "",
    noticeShow: false,
    isSubmit: true,
    btnState: "提 交",
    name: null,
    nb: null,
    phone: null,
    email: null,
    class: null,
    intro: null,
    introReplace: null,
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
    sexColumns: [
      {
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
    departmentColumns1: [
      {
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
    departmentColumns2: [
      {
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
    });
  },

  // 展示弹出层
  onPopupShow() {
    if (this.data.intro === null) {
      this.setData({
        introReplace: "赶紧介绍一下自己有趣的灵魂叭~ ♪(´▽｀)"
      });
    } else {
      this.setData({
        introReplace: this.data.intro
      });
    }
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
      url: api.college,
      success: res => {
        if (res.statusCode === 200 && res.data) {
          this.setData({
            college: res.data.data
          });
        }
      },
      fail: () => {}
    });
  },

  getNotice() {
    wx.request({
      url: api.notice,
      data: {},
      method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        // success
        if (res.statusCode === 200) {
          if (res.data.code === 1) {
            this.setData({
              noticeShow: true,
              notice: res.data.msg
            });
          }

          if (res.data.open) {
            this.setData({
              isSubmit: true,
              btnState: "提 交"
            });
          } else {
            this.setData({
              isSubmit: false,
              btnState: "未开放"
            });
          }

          return;
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
  },

  // 验证表单
  checkForm(data) {
    // 遍历data对象，检测是否为空，
    // 邮箱和第二志愿可以空，但只有email的值可以为null
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        if (element === null && key !== "email") {
          return {
            type: "error",
            msg: "empty",
            index: key
          };
        }
      }
    }

    // 检测是否含有非法字符
    const illegal = ["test", "script", "admin"];
    const illegalItem = {
      name: {
        title: "姓名",
        value: false
      },
      class: {
        title: "班级",
        value: false
      },
      introduction: {
        title: "个人简介",
        value: false
      }
    };

    illegal.forEach(index => {
      if (data.name.indexOf(index) !== -1) {
        illegalItem.name.value = true;
      } else if (data.class.indexOf(index) !== -1) {
        illegalItem.class.value = true;
      } else if (data.introduction.indexOf(index) !== -1) {
        illegalItem.introduction.value = true;
      }
    });

    for (const key in illegalItem) {
      if (illegalItem.hasOwnProperty(key)) {
        const element = illegalItem[key];
        if (element.value) {
          return {
            type: "error",
            msg: element.title + "内含有非法字符！"
          };
        }
      }
    }

    // 学号格式
    if (data.nb.length !== 11) {
      return {
        type: "error",
        msg: "请正确输入11位的学号！"
      };
    }

    // 号码格式
    if (data.phone.length !== 11) {
      return {
        type: "error",
        msg: "请正确输入11位的电话号码！"
      };
    }

    // 检测第一志愿的值是否为有效值
    if (data.part_1 === 0) {
      return {
        type: "error",
        msg: "请选择第一意向部门！"
      };
    } else if (data.part_2 === data.part_1) {
      return {
        type: "error",
        msg: "第一意向和第二意向不能相同！"
      };
    }

    return {
      type: "success"
    };
  },

  /**
   * 表单提交
   * 1. 获取规范表单数据
   * 2. 数据验证
   * 3. 提交
   */
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
    if (result.type === "error") {
      switch (result.msg) {
        // 有空项
        case "empty":
          this.setData({
            errorState: {
              ...this.data.errorState,
              [result.index]: true
            }
          });
          Notify({
            text: "请将信息填写完整！",
            duration: 1500,
            selector: "#error-notify",
            backgroundColor: "#ed4014"
          });
          return;

        // 其他错误
        default:
          Notify({
            text: result.msg,
            duration: 1500,
            selector: "#error-notify",
            backgroundColor: "#ed4014"
          });
          return;
      }
    }

    // 更换提交按钮状态
    this.setData({
      submitState: true
    });

    // 提交
    wx.request({
      url: api.form,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: data,

      // 成功
      success: res => {
        // 正确数据
        if (res.statusCode === 200) {
          this.setData({
            submitState: false
          });

          // 更新未超过三次
          if (res.data.code === 2) {
            wx.navigateTo({
              url: "/pages/result/result?type=update"
            });
            return;
          }

          // 更新超过三次
          if (res.data.code === 3) {
            Notify({
              text: res.data.msg,
              duration: 2000,
              selector: "#error-notify",
              backgroundColor: "#ed4014"
            });
            return;
          }

          // 第一次提交
          wx.navigateTo({
            url: "/pages/result/result?type=insert"
          });

          return;
        }

        // 格式错误
        if (res.statusCode === 500) {
          // 邮箱格式错误
          if (res.data.errors.email) {
            Notify({
              text: "邮箱格式错误！",
              duration: 1500,
              selector: "#error-notify",
              backgroundColor: "#ed4014"
            });
          } else if (res.data.errors.name) {
            Notify({
              text: "姓名格式错误！",
              duration: 1500,
              selector: "#error-notify",
              backgroundColor: "#ed4014"
            });
          } else if (res.data.errors.class) {
            Notify({
              text: "班级格式错误！",
              duration: 1500,
              selector: "#error-notify",
              backgroundColor: "#ed4014"
            });
          }
          this.setData({
            submitState: false
          });
          return;
        }

        // 未知报错
        Notify({
          text: "服务器错误，请稍后再试！",
          duration: 1500,
          selector: "#error-notify",
          backgroundColor: "#ed4014"
        });
        this.setData({
          submitState: false
        });
        return;
      },

      // 失败
      fail: err => {
        Notify({
          text: "服务器错误，请稍后再试！",
          duration: 1500,
          selector: "#error-notify",
          backgroundColor: "#ed4014"
        });
        this.setData({
          submitState: false
        });
        return;
      }
    });
  },

  cancelError(e) {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCollege();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getNotice();
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
  onShareAppMessage: function() {
    return {
      title: "青春在线纳新啦，赶紧报名吧！",
      path: "/pages/index/index"
    };
  }
});
