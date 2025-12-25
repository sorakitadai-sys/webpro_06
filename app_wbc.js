"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// データ定義
let wbcData = [
    { id:1, year: 2006, edition: '第1回', champion: '日本', mvp_player: '松坂大輔' },
    { id:2, year: 2009, edition: '第2回', champion: '日本', mvp_player: '松坂大輔' },
    { id:3, year: 2013, edition: '第3回', champion: 'ドミニカ共和国', mvp_player: 'ロビンソン・カノ' },
    { id:4, year: 2017, edition: '第4回', champion: 'アメリカ合衆国', mvp_player: 'マーカス・ストローマン' },
    { id:5, year: 2023, edition: '第5回', champion: '日本', mvp_player: '大谷翔平' }
];

// ルーティング
app.get("/", (req, res) => res.redirect("/wbc"));

app.get("/wbc", (req, res) => {
    res.render('wbc_list', { data: wbcData });
});

app.get("/wbc/:number", (req, res) => {
    const number = req.params.number;
    res.render('wbc_detail', { id: number, data: wbcData[number] });
});

app.get("/wbc_create", (req, res) => {
    res.render('wbc_add');
});

app.post("/wbc", (req, res) => {

    const newId = wbcData.length + 1; 
    
    wbcData.push({
        id: newId,
        year: Number(req.body.year),
        edition: req.body.edition,
        champion: req.body.champion,
        mvp_player: req.body.mvp_player
    });
    res.redirect('/wbc');
});

app.get("/wbc/edit/:number", (req, res) => {
    const number = req.params.number;
    res.render('wbc_edit', { id: number, data: wbcData[number] });
});

app.post("/wbc/update/:number", (req, res) => {
    const number = req.params.number;
    wbcData[number].year = Number(req.body.year);
    wbcData[number].edition = req.body.edition;
    wbcData[number].champion = req.body.champion;
    wbcData[number].mvp_player = req.body.mvp_player;
    res.redirect('/wbc');
});

// 削除
app.get("/wbc/delete_confirm/:number", (req, res) => {
    const number = req.params.number;
    res.render('wbc_delete', { id: number, data: wbcData[number] });
});

// 削除 (処理) - GETメソッド
app.get("/wbc/delete/:number", (req, res) => {
    const number = req.params.number;
    wbcData.splice(number, 1);
    res.redirect('/wbc');
});

app.listen(8082, () => console.log("WBC App listening on port 8082"));