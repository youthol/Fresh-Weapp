//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    logoAni: null,
    titleAni: null,
    txtAni: null,
    btnAni: null
  },
  onLoad: function () {
    this.showAni();
  },
  showAni: function () {
    const logoAni = wx.createAnimation({
      duration: 600,
      delay: 400,
      timingFunction: "ease"
    });

    const titleAni = wx.createAnimation({
      duration: 600,
      delay: 600,
      timingFunction: "ease"
    })

    const txtAni = wx.createAnimation({
      duration: 800,
      delay: 800,
      timingFunction: "ease"
    })

    const btnAni = wx.createAnimation({
      duration: 800,
      delay: 1000,
      timingFunction: "ease"
    })


    logoAni.opacity(1).translateY(-20).step();
    titleAni.opacity(1).translateY(-20).step();
    txtAni.opacity(1).translateY(-20).step();
    btnAni.opacity(1).translateY(-20).step();
    this.setData({
      logoAni: logoAni.export(),
      titleAni: titleAni.export(),
      txtAni: txtAni.export(),
      btnAni: btnAni.export()
    })
  },
  navTo: function () {
    wx.redirectTo({
      url: '/pages/intro/intro',
    })
  }
});
