"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let original10 = [
  { name:"鹿島アントラーズ", hometown:"茨城県鹿島郡鹿島町ほか", stadium:"茨城県立カシマサッカースタジアム", Championshiphistory:9},
  { name:"ジェフユナイテッド市原", hometown:"千葉県市原市", stadium:"フクダ電子アリーナ", Championshiphistory:0},
  { name:"浦和レッズダイヤモンド", hometown:"埼玉県浦和市", stadium:"埼玉スタジアム", Championshiphistory:1},
  { name:"ヴェルディ川崎", hometown:"神奈川県川崎市", stadium:"等々力陸上競技場", Championshiphistory:2},
  { name:"横浜マリノス", hometown:"神奈川県横浜市", stadium:"日産スタジアム", Championshiphistory:5},
  { name:"横浜フリューゲルス", hometown:"神奈川県横浜市", stadium:"三ツ沢公園球技場", Championshiphistory:0},
  { name:"清水エスパルス", hometown:"静岡県清水市", stadium:"三ツ沢球技場", Championshiphistory:0},
  { name:"名古屋グランパスエイト", hometown:"愛知県名古屋市", stadium:"豊田スタジアム", Championshiphistory:1},
  { name:"ガンバ大阪", hometown:"大阪府吹田市", stadium:"市立吹田サッカースタジアム", Championshiphistory:2},
  { name:"サンフレッチェ広島", hometown:"広島県広島市", stadium:"エディオンスタジアム広島", Championshiphistory:3},
];


app.get("/", (req, res) => res.redirect("/original10"));


app.get("/original10", (req, res) => {
    res.render('original10_list', { data: original10 });
});


app.get("/original10/:number", (req, res) => {
    const number = req.params.number;
    const detail = original10[number];
    res.render('original10_detail', { id: number, data: detail });
});


app.get("/original10_create", (req, res) => {
    res.render('original10_add');
});

app.post("/original10", (req, res) => {

    original10.push({
        name: req.body.name,
        hometown: req.body.hometown,
        stadium: req.body.stadium,
        Championshiphistory: Number(req.body.Championshiphistory)
    });
    res.redirect('/original10');
});


app.get("/original10/edit/:number", (req, res) => {
    const number = req.params.number;
    const detail = original10[number];
    res.render('original10_edit', { id: number, data: detail });
});


app.post("/original10/update/:number", (req, res) => {
    const number = req.params.number;

    original10[number] = {
        name: req.body.name,
        hometown: req.body.hometown,
        stadium: req.body.stadium,
        Championshiphistory: Number(req.body.Championshiphistory)
    };
    res.redirect('/original10');
});


app.get("/original10/delete_confirm/:number", (req, res) => {
    const number = req.params.number;
    const detail = original10[number];
    res.render('original10_delete', { id: number, data: detail });
});


app.get("/original10/delete/:number", (req, res) => {
    const number = req.params.number;
    original10.splice(number, 1);
    res.redirect('/original10');
});

app.listen(8080, () => console.log("J-League App listening on port 8080!"));