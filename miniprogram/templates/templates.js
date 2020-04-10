export const detail=(type,data={})=>{
    return new Promise((resolve,reject)=>{
        const keys=Object.keys(data)
        let params="type="+type+"&"
        keys.forEach(v=>{
            let temp=v+"="+data[v]+"&"
            params+=temp
        })
        params=params.substr(0,params.length-1)
        // console.log(params)
        let url='../detail/detail?'+params
        wx.navigateTo({
            url,
            success: (result)=>{
                resolve(result)
                
            },
            fail: (err)=>{
                reject(err)
            },
        });
    })
}
export const getNews=(biaoti,href)=>{
    return new Promise((resolve,reject)=>{
        detail('newsdetail',biaoti,href)
    })
}