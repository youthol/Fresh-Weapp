//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    logoAni: null,
    titleAni: null,
    txtAni: null
  },
  onLoad: function () {
    this.showAni();
  },
  showAni: function () {
    var logoAni = wx.createAnimation({
      duration: 600,
      delay: 400,
      timingFunction: "ease"
    });

    var titleAni = wx.createAnimation({
      duration: 600,
      delay: 600,
      timingFunction: "ease"
    })

    const txtAni = wx.createAnimation({
      duration: 800,
      delay: 1000,
      timingFunction: "ease"
    })


    logoAni.opacity(1).top(-20).step();
    titleAni.opacity(1).top(-20).step();
    txtAni.opacity(1).step();
    this.setData({
      logoAni: logoAni.export(),
      titleAni: titleAni.export(),
      txtAni: txtAni.export()
    })
  }
})
