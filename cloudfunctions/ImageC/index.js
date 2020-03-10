// 云函数入口文件
const cloud = require('wx-server-sdk')
let AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
const args = require("conf.js");

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  let APP_ID = args.APP_ID;
  let API_KEY = args.API_KEY;
  let SECRET_KEY = args.SECRET_KEY;
  let client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);
  let fileID = event.fid;
  let res = await cloud.downloadFile({ fileID: fileID, })
  let image = res.fileContent.toString("base64");  // 调用通用文字识别, 图片参数为远程url图片 
  return client.advancedGeneral(image);
}