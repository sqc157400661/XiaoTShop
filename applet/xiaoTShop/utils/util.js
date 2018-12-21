var api = require('../config/api.js');

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function goLoginPageTimeOut() {
    setTimeout(function() {
        wx.reLaunch({
            url: "/pages/authorize/index"
        })
    }, 1000)
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function toUrl(url, params) {
    let paramsArr = [];
    if (params) {
        Object.keys(params).forEach(item => {
            paramsArr.push(item + '=' + params[item]);
        })
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArr.join('&');
        } else {
            url += '&' + paramsArr.join('&');
        }

    }
    return url;
}
/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
    return new Promise(function(resolve, reject) {
        var token = wx.getStorageSync('token');
        url = toUrl(url, {
            'token': token
        })
        wx.request({
            url: url,
            data: data,
            method: method,
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + wx.getStorageSync('token')
            },
            success: function(res) {
                if (res.data.code == 200) {
                    resolve(res.data);
                } else if (res.data.code == 401) {
                    //需要登录后才可以操作
                    let code = null;
                    return login().then((res) => {
                        code = res.code;
                        return getUserInfo();
                    }).then((userInfo) => {
                        console.log(userInfo);
                        //登录远程服务器
                        request(api.AuthLoginByWeixin, {
                            code: code,
                            encryptedData: userInfo.encryptedData,
                            iv: userInfo.iv,
                            rawData: userInfo.rawData
                        }, 'POST').then(res => {
                            if (res.code == 200) {
                                //存储用户信息
                                wx.setStorageSync('userInfo', res.data.userInfo);
                                wx.setStorageSync('token', res.data.token);
                                resolve(res);
                                wx.reLaunch({
                                    url: '/pages/index/index',
                                });
                            } else {
                                reject(res);
                            }
                        }).catch((err) => {
                            reject(err);
                        });

                    }).catch((err) => {
                        reject(err);
                    })
                } else {
                    reject(res);
                }

            },
            fail: function(err) {
                reject(err)
                console.log("failed")
            }
        })
    });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
    return new Promise(function(resolve, reject) {
        wx.checkSession({
            success: function() {
                resolve(true);
            },
            fail: function() {
                reject(false);
            }
        })
    });
}

/**
 * 调用微信登录
 */
function login() {
    return new Promise(function(resolve, reject) {
        wx.login({
            success: function(res) {
                if (res.code) {
                    //登录远程服务器
                    resolve(res);
                } else {
                    reject(res);
                }
            },
            fail: function(err) {
                reject(err);
            }
        });
    });
}

function getUserInfo() {
    return new Promise(function(resolve, reject) {
        wx.getUserInfo({
            withCredentials: true,
            success: function(res) {
                console.log(res)
                resolve(res);
            },
            fail: function(err) {
                goLoginPageTimeOut();
                console.log(err);
                reject(err);
            }
        })
    });
}

function redirect(url) {

    //判断页面是否需要登录
    if (false) {
        wx.redirectTo({
            url: '/pages/auth/login/login'
        });
        return false;
    } else {
        wx.redirectTo({
            url: url
        });
    }
}

function showErrorToast(msg) {
    wx.showToast({
        title: msg,
        image: '/static/images/icon_error.png'
    })
}

module.exports = {
    formatTime,
    request,
    redirect,
    showErrorToast,
    checkSession,
    login,
    getUserInfo,
}