interface Template {
    wxml: string,
    less: string,
    js: string,
    json: string,
}

export function getPageTemplate(): Template {
    return {
        wxml: `<view>hi</view>`,
        less: ``,
        js: 
`Page({

    /**
     * 页面的初始数据
     */
    data: {
    
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
    
    }
})`,
        json:
`{
    "usingComponents": {}
}`
    };
}

export function getComponentTemplate(): Template {
    return {
        wxml: 
`<view>hi</view>`,
        less: ``,
        js: 
`Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})`
        ,
        json: 
`{
    "component": true,
    "usingComponents": {}
}`
    };
}