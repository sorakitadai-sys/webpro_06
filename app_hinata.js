"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let hinata = [
  { title:"キュン", release:"2019-3-27", center:"小坂菜緒", Commoncoupling:"JOYFUL LOVE"},
  { title:"ドレミソラシド", release:"2019-7-17", center:"小坂菜緒", Commoncoupling:"キツネ"},
  { title:"こんなに好きになっちゃっていいの？", release:"2019-10-2", center:"小坂菜緒", Commoncoupling:"ホントの時間"},
  { title:"ソンナコトナイヨ", release:"2020-2-19", center:"小坂菜緒", Commoncoupling:"青春の馬"},
  { title:"君しか勝たん", release:"2021-5-26", center:"加藤史帆", Commoncoupling:"声の足跡"},
  { title:"ってか", release:"2021-10-27", center:"金村美玖", Commoncoupling:"アディショナルタイム"},
  { title:"僕なんか", release:"2022-6-1", center:"小坂菜緒", Commoncoupling:"飛行機雲ができる理由"},
  { title:"月と星が踊るMidnight", release:"2019-10-26", center:"齊藤京子", Commoncoupling:"HEY!OHISAMA!"},
  { title:"One choice", release:"2023-4-19", center:"丹生明里", Commoncoupling:"恋は逃げ足が早い"},
  { title:"Am I ready?", release:"2023-7-26", center:"上村ひなの", Commoncoupling:"見たことない魔物"},
  { title:"君はハニーデュー", release:"2024-5-8", center:"正源司陽子", Commoncoupling:"錆つかない剣を持て！"},
  { title:"絶対的第六感", release:"2024-9-18", center:"正源司陽子・藤嶌果歩", Commoncoupling:"君を覚えてない"},
  { title:"卒業写真だけが知ってる", release:"2025-1-29", center:"小坂菜緒", Commoncoupling:"SUZUKA"},
  { title:"Love yourself!", release:"2025-5-21", center:"小坂菜緒", Commoncoupling:"ジャーマンアイリス"},
  { title:"お願いバッハ!", release:"2025-9-17", center:"小坂菜緒・金村美玖", Commoncoupling:"空飛ぶ車"},
];


app.get("/", (req, res) => res.redirect("/hinata"));


app.get("/hinata", (req, res) => {
    res.render('hinata_list', { data: hinata });
});


app.get("/hinata/:number", (req, res) => {
    const number = req.params.number;
    res.render('hinata_detail', { id: number, data: hinata[number] });
});


app.get("/hinata_create", (req, res) => {
    res.render('hinata_add');
});

app.post("/hinata", (req, res) => {

    hinata.push({
        title: req.body.title,
        release: req.body.release,
        center: req.body.center,
        Commoncoupling: req.body.Commoncoupling
    });
    res.redirect('/hinata');
});


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


app.get("/hinata/delete_confirm/:number", (req, res) => {
    const number = req.params.number;
    res.render('hinata_delete', { id: number, data: hinata[number] });
});


app.get("/hinata/delete/:number", (req, res) => {
    const number = req.params.number;
    hinata.splice(number, 1);
    res.redirect('/hinata');
});

app.listen(8081, () => console.log("Hinata App listening on port 8081"));