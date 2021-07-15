const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json")


const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
