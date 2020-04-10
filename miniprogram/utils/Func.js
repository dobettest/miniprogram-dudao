export const cloudFunc = (name, data) => {
  wx.showLoading({
    title: '加载中',
    mask: true,
  });
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name,
      // 传递给云函数的参数
      data,
      success: res => {
        // output: res.result === 3
        resolve(res.result);
      },
      fail: err => {
        reject(err);
      },
      complete: () => {
        wx.hideLoading();

      }
    })
  })
}
export const chooseImage = () => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // output: res.result === 3
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    });
  })
}
export const uploadFile = (cloudPath, filePath) => {
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        resolve(res)
      },
      fail: err => {
        // handle error
        reject(err)
      }
    })
  }
  )
}
export const removeFile = (fileList) => {
  console.log(fileList)
  return new Promise((resolve, reject) => {
    wx.cloud.deleteFile({
      fileList: fileList.fid,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    }
    )
  }
  )
}
export const showToast = (title) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title,
      mask: true,
      success: res => {
        resolve(res)
      },
      fail: err => {
        // handle error
        reject(err)
      }
    })
  })
}
export const request = params => {
  wx.showLoading({
    title: '加载中',
    mask: true,
  });
  const BaseUrl = "https://www.dobettest.cn:8000"
  return new Promise((resolve, reject) => {
    wx.request({
      url: BaseUrl + params.url,
      data: params.data,
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        wx - wx.hideLoading()
      }
    });
  })
}
export const formatTime = date => {
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')

}