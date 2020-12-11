const request  = require('request');
const _ = require("./lodash");
const fs = require("fs");
let writefile;
let logger;
let members;

function setFSConfig() {
  const options = {
    flags: "w",
    encoding: "utf8",
    highWaterMark: 9999
  };
  writefile = fs.createWriteStream("./log.txt", options);
  logger = new console.Console(writefile);
}

function writeLog(parama) {
  parama = JSON.stringify(parama);
  logger.log(parama);
}

function updateLog() {
  fs.readFile("./log.txt", "utf-8", function(err, data) {
    const readLogData = !_.isArray(data) && eval(data) || [];
    setFSConfig();
    writeLog(readLogData.concat(getReplies(members)));
  });
}

function getReplies(parama) {
  return _.map(parama.data.replies, function(item) {
    return item.member.uname + ":" + item.content.message;
  });
}

function getLuckyMan() {
  fs.readFile("./log.txt", "utf-8", function(err, data) {
    let readLogData = eval(data) || [];
    readLogData = readLogData.reverse();
    const floors = readLogData.length;
    const floor = Math.floor(Math.random() * floors);
    console.log("▲ 参加楼层总共:" + floors + "层 ▼");
    console.log("▲ 恭喜！第" + (floor + 1) + "层 ▼\n" + readLogData[floor]);
  });
}

function jQuery17209663270426838746_1607591659720(PageData){
  members = PageData;
  updateLog();
}

function getPageData(page){
  const options = {
    url: 'https://api.bilibili.com/x/v2/reply',
    headers: {
      'cookie': '_uuid=79CCDDFD-34DE-65E2-8416-610AA0EF903F65244infoc; buvid3=E48A07D6-0F3E-4B16-AFA4-F6E71824ADEB58465infoc; sid=k1ymrk6k; DedeUserID=28130501; DedeUserID__ckMd5=4c38bd77ff2528fb; SESSDATA=91e9730a%2C1623127673%2C77d73*c1; bili_jct=532125b7806ef6c33a0c6491b85b14e6; CURRENT_FNVAL=80; blackside_state=1; bsource=search_baidu; bfe_id=61a513175dc1ae8854a560f6b82b37af',
      'referer':'https://www.bilibili.com/',
      'sec-fetch-dest':'script'
    },
    qs:{
      callback:'jQuery17209663270426838746_1607591659720',
      jsonp:'jsonp',
      pn:page,
      type:'1',
      oid:'843003483',
      sort:'0',
      _:'1607591670864'
    }
  };

  request(options, function (error, response, body) {
    eval(body);
  })

}
// getPageData(1);
// let n = 0;
// const time = setInterval(function(){
//   n++;
//   console.log('第'+n+'次执行')
//   getPageData(n);

//   if( n === 108){
//     clearInterval(time);
//   }
//  },5000)
getLuckyMan();
