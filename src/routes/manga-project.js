"use strict";

var mysql = require("mysql"),
	  express = require("express");
var app = express();

// establish mysql connection to GearHost
var connection = mysql.createConnection({
	host: "den1.mysql2.gear.host",
	user: "namwinmysql",
	password: "Pro1995!",
	database: "namwinmysql",
});

// router.route("/name/:myName/age/:myage").get(function(req, res) {
// name = req.params.myName;
// age = req.params.myage;
// });
app.get("/mangaList",function(req,res) {
	connection.query("SELECT m.id,m.name,m.other_name,m.author,m.categories,m.description,m.image, "+
					"GROUP_CONCAT(c.chapter order by c.chapter desc separator ','') as chapters "+
					"FROM manga m JOIN chapters c ON c.mangaid=m.id "+
					"GROUP BY m.id ORDER BY name asc; ",
		function (err,result) {
			if (err) throw err;
			res.send(result);
		})
});

app.get("/:mangaid/:chapter",function(req,res) {
	let manga_id = req.params.mangaid;
	let chapter = req.params.chapter;
		connection.query("SELECT images FROM chapters WHERE mangaid=" + manga_id + " and chapter =" + chapter,
		function (err,result) {
			if (err) throw err;
			res.send(result);
		})
});

app.get("/chapterList",function(req,res) {
	let manga_id = req.body['manga_id'];
		connection.query("SELECT GROUP_CONCAT(chapter order by chapter desc separator ',') as chapters FROM chapters WHERE mangaid="+manga_id,
		function (err,result) {
			if (err) throw err;
			res.send(result);
		})
});
module.exports = app;
