const express = require("express");
const path = require("path");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

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