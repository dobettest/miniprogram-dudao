const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  try {
   let res=await db.collection('Schoolnews').where({name:event.name}).get()
   let arr=res.data[0]||{}
   arr.comments.sort(function(a,b){
     if(a.padte==b.padte){
       return b.num-a.num
     }else{
       var r1=RegExp('/\W/','g')
       var s1=a.padte.replace(r,'')
       var s2=b.padte.replace(r1,'')
       return s2-s1;
     }
      
   })
   return arr;

  } catch (e) {
  }
}