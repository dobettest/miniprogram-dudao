export const chooseFile=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseMessageFile({
              type:"file",
              count:3,
              extension:['txt','docx','doc','xlsx'],
            success: res => {
              // output: res.result === 3
              resolve(res.tempFiles);
              console.log(res)
            },
            fail: err => {
              console.log(err)
              reject(err);
                
            }
          })
    })
}