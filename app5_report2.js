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

let original10 = [
  { id:1, code:"01", name:"鹿島アントラーズ", hometown:"茨城県鹿島郡鹿島町ほか", stadium:"茨城県立カシマサッカースタジアム", Championshiphistory:9},
  { id:2, code:"02", name:"ジェフユナイテッド市原", hometown:"千葉県市原市", stadium:"フクダ電子アリーナ", Championshiphistory:0},
  { id:3, code:"03", name:"浦和レッズダイヤモンド", hometown:"埼玉県浦和市", stadium:"埼玉スタジアム", Championshiphistory:1},
  { id:4, code:"04", name:"ヴェルディ川崎", hometown:"神奈川県川崎市", stadium:"等々力陸上競技場", Championshiphistory:2},
  { id:5, code:"05", name:"横浜マリノス", hometown:"神奈川県横浜市", stadium:"日産スタジアム", Championshiphistory:5},
  { id:6, code:"06", name:"横浜フリューゲルス", hometown:"神奈川県横浜市", stadium:"三ツ沢公園球技場", Championshiphistory:0},
  { id:7, code:"07", name:"清水エスパルス", hometown:"静岡県清水市", stadium:"三ツ沢球技場", Championshiphistory:0},
  { id:8, code:"08", name:"名古屋グランパスエイト", hometown:"愛知県名古屋市", stadium:"豊田スタジアム", Championshiphistory:1},
  { id:9, code:"09", name:"ガンバ大阪", hometown:"大阪府吹田市", stadium:"市立吹田サッカースタジアム", Championshiphistory:2},
  { id:10, code:"10", name:"サンフレッチェ広島", hometown:"広島県広島市", stadium:"エディオンスタジアム広島", Championshiphistory:3},
  
];

let hinata = [
  { id:1, code:"01", title:"キュン", release:"2019-3-27", center:"小坂菜緒", Commoncoupling:"JOYFUL LOVE"},
  { id:2, code:"02", title:"ドレミソラシド", release:"2019-7-17", center:"小坂菜緒", Commoncoupling:"キツネ"},
  { id:3, code:"03", title:"こんなに好きになっちゃっていいの？", release:"2019-10-2", center:"小坂菜緒", Commoncoupling:"ホントの時間"},
  { id:4, code:"04", title:"ソンナコトナイヨ", release:"2020-2-19", center:"小坂菜緒", Commoncoupling:"青春の馬"},
  { id:5, code:"05", title:"君しか勝たん", release:"2021-5-26", center:"加藤史帆", Commoncoupling:"声の足跡"},
  { id:6, code:"06", title:"ってか", release:"2021-10-27", center:"金村美玖", Commoncoupling:"アディショナルタイム"},
  { id:7, code:"07", title:"僕なんか", release:"2022-6-1", center:"小坂菜緒", Commoncoupling:"飛行機雲ができる理由"},
  { id:8, code:"08", title:"月と星が踊るMidnight", release:"2019-10-26", center:"齊藤京子", Commoncoupling:"HEY!OHISAMA!"},
  { id:9, code:"09", title:"One choice", release:"2023-4-19", center:"丹生明里", Commoncoupling:"恋は逃げ足が早い"},
  { id:10, code:"10", title:"Am I ready?", release:"2023-7-26", center:"上村ひなの", Commoncoupling:"見たことない魔物"},
  { id:11, code:"11", title:"君はハニーデュー", release:"2024-5-8", center:"正源司陽子", Commoncoupling:"錆つかない剣を持て！"},
  { id:12, code:"12", title:"絶対的第六感", release:"2024-9-18", center:"正源司陽子・藤嶌果歩", Commoncoupling:"君を覚えてない"},
  { id:13, code:"13", title:"卒業写真だけが知ってる", release:"2025-1-29", center:"小坂菜緒", Commoncoupling:"SUZUKA"},
  { id:14, code:"14", title:"Love yourself!", release:"2025-5-21", center:"小坂菜緒", Commoncoupling:"ジャーマンアイリス"},
  { id:15, code:"15", title:"お願いバッハ!", release:"2025-9-17", center:"小坂菜緒・金村美玖", Commoncoupling:"空飛ぶ車"},
]

let wbcData = [
    { year: 2006, edition: '第1回', champion: '日本', mvp_player: '松坂大輔' },
    { year: 2009, edition: '第2回', champion: '日本', mvp_player: '松坂大輔' },
    { year: 2013, edition: '第3回', champion: 'ドミニカ共和国', mvp_player: 'ロビンソン・カノ' },
    { year: 2017, edition: '第4回', champion: 'アメリカ合衆国', mvp_player: 'マーカス・ストローマン' },
    { year: 2023, edition: '第5回', champion: '日本', mvp_player: '大谷翔平' }
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