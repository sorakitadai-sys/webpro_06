const express = require("express");
const path = require("path");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
  { id:7, code:"JE08", name:"稲毛海岸駅"},
];

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
});

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.render('db1', { data: station });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "janken.html"));
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  const hand = req.query.radio; // "1", "2", "3"
  let win = parseInt(req.query.win, 10);
  let total = parseInt(req.query.total, 10);

  // --- NaNのときは0で初期化 ---
  if (isNaN(win)) win = 0;
  if (isNaN(total)) total = 0;

  console.log("受信データ:", { hand, win, total });

  // --- 自分の手 ---
  let your = "未選択";
  if (hand === "1") your = "グー";
  else if (hand === "2") your = "チョキ";
  else if (hand === "3") your = "パー";

  // --- コンピュータの手 ---
  const cpu_num = Math.floor(Math.random() * 3) + 1;
  const cpu = ["グー", "チョキ", "パー"][cpu_num - 1];

  // --- 勝敗判定 ---
  let judgement = "";
  if (!hand) {
    judgement = "手が選ばれていません";
  } else {
    const hnum = parseInt(hand, 10);
    if (hnum === cpu_num) {
      judgement = "引き分け";
    } else if (
      (hnum === 1 && cpu_num === 2) ||
      (hnum === 2 && cpu_num === 3) ||
      (hnum === 3 && cpu_num === 1)
    ) {
      judgement = "勝ち";
      win++;
    } else {
      judgement = "負け";
    }
    total++;
  }

  res.render("janken", { your, cpu, judgement, win, total });
});

app.listen(8080, () => console.log("✅ Server started on http://localhost:8080"));