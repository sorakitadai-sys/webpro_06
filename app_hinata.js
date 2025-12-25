"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let hinata = [
  { id:1, title:"キュン", release:"2019-3-27", center:"小坂菜緒", Commoncoupling:"JOYFUL LOVE"},
  { id:2, title:"ドレミソラシド", release:"2019-7-17", center:"小坂菜緒", Commoncoupling:"キツネ"},
  { id:3, title:"こんなに好きになっちゃっていいの？", release:"2019-10-2", center:"小坂菜緒", Commoncoupling:"ホントの時間"},
  { id:4, title:"ソンナコトナイヨ", release:"2020-2-19", center:"小坂菜緒", Commoncoupling:"青春の馬"},
  { id:5, title:"君しか勝たん", release:"2021-5-26", center:"加藤史帆", Commoncoupling:"声の足跡"},
  { id:6, title:"ってか", release:"2021-10-27", center:"金村美玖", Commoncoupling:"アディショナルタイム"},
  { id:7, title:"僕なんか", release:"2022-6-1", center:"小坂菜緒", Commoncoupling:"飛行機雲ができる理由"},
  { id:8, title:"月と星が踊るMidnight", release:"2019-10-26", center:"齊藤京子", Commoncoupling:"HEY!OHISAMA!"},
  { id:9, title:"One choice", release:"2023-4-19", center:"丹生明里", Commoncoupling:"恋は逃げ足が早い"},
  { id:10, title:"Am I ready?", release:"2023-7-26", center:"上村ひなの", Commoncoupling:"見たことない魔物"},
  { id:11, title:"君はハニーデュー", release:"2024-5-8", center:"正源司陽子", Commoncoupling:"錆つかない剣を持て！"},
  { id:12, title:"絶対的第六感", release:"2024-9-18", center:"正源司陽子・藤嶌果歩", Commoncoupling:"君を覚えてない"},
  { id:13, title:"卒業写真だけが知ってる", release:"2025-1-29", center:"小坂菜緒", Commoncoupling:"SUZUKA"},
  { id:14, title:"Love yourself!", release:"2025-5-21", center:"小坂菜緒", Commoncoupling:"ジャーマンアイリス"},
  { id:15, title:"お願いバッハ!", release:"2025-9-17", center:"小坂菜緒・金村美玖", Commoncoupling:"空飛ぶ車"},
];

// ルーティング
app.get("/", (req, res) => res.redirect("/hinata"));

// 一覧
app.get("/hinata", (req, res) => {
    res.render('hinata_list', { data: hinata });
});

// 詳細
app.get("/hinata/:number", (req, res) => {
    const number = req.params.number;
    res.render('hinata_detail', { id: number, data: hinata[number] });
});

// 新規登録
app.get("/hinata_create", (req, res) => {
    res.render('hinata_add');
});

app.post("/hinata", (req, res) => {
    const maxId = hinata.reduce((max, item) => item.id > max ? item.id : max, 0);
    hinata.push({
        id: maxId + 1,
        // code削除
        title: req.body.title,
        release: req.body.release,
        center: req.body.center,
        Commoncoupling: req.body.Commoncoupling
    });
    res.redirect('/hinata');
});

// 編集
app.get("/hinata/edit/:number", (req, res) => {
    const number = req.params.number;
    res.render('hinata_edit', { id: number, data: hinata[number] });
});

app.post("/hinata", (req, res) => {
    const newId = hinata.length + 1;

    hinata.push({
        id: newId,
        title: req.body.title,
        release: req.body.release,
        center: req.body.center,
        Commoncoupling: req.body.Commoncoupling
    });
    res.redirect('/hinata');
});

// 削除 (確認)
app.get("/hinata/delete_confirm/:number", (req, res) => {
    const number = req.params.number;
    res.render('hinata_delete', { id: number, data: hinata[number] });
});

// 削除 (処理) - GETメソッド
app.get("/hinata/delete/:number", (req, res) => {
    const number = req.params.number;
    hinata.splice(number, 1);
    res.redirect('/hinata');
});

app.listen(8081, () => console.log("Hinata App listening on port 8081"));