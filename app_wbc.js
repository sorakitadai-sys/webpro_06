"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let wbc = [
    { year: 2006, edition: '第1回', champion: '日本', mvp_player: '松坂大輔' },
    { year: 2009, edition: '第2回', champion: '日本', mvp_player: '松坂大輔' },
    { year: 2013, edition: '第3回', champion: 'ドミニカ共和国', mvp_player: 'ロビンソン・カノ' },
    { year: 2017, edition: '第4回', champion: 'アメリカ合衆国', mvp_player: 'マーカス・ストローマン' },
    { year: 2023, edition: '第5回', champion: '日本', mvp_player: '大谷翔平' }
];


app.get("/", (req, res) => res.redirect("/wbc"));

app.get("/wbc", (req, res) => {
    res.render('wbc_list', { data: wbc });
});

app.get("/wbc/:number", (req, res) => {
    const number = req.params.number;
    res.render('wbc_detail', { id: number, data: wbc[number] });
});

app.get("/wbc_create", (req, res) => {
    res.render('wbc_add');
});

app.post("/wbc", (req, res) => {
    
    wbc.push({
        year: Number(req.body.year),
        edition: req.body.edition,
        champion: req.body.champion,
        mvp_player: req.body.mvp_player
    });
    res.redirect('/wbc');
});

app.get("/wbc/edit/:number", (req, res) => {
    const number = req.params.number;
    res.render('wbc_edit', { id: number, data: wbc[number] });
});

app.post("/wbc/update/:number", (req, res) => {
    const number = req.params.number;
    wbc[number].year = Number(req.body.year);
    wbc[number].edition = req.body.edition;
    wbc[number].champion = req.body.champion;
    wbc[number].mvp_player = req.body.mvp_player;
    res.redirect('/wbc');
});


app.get("/wbc/delete_confirm/:number", (req, res) => {
    const number = req.params.number;
    res.render('wbc_delete', { id: number, data: wbc[number] });
});


app.get("/wbc/delete/:number", (req, res) => {
    const number = req.params.number;
    wbc.splice(number, 1);
    res.redirect('/wbc');
});

app.listen(8082, () => console.log("WBC App listening on port 8082"));