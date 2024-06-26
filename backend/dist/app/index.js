"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");
const app = express();
/** Install request logger */
app.use(morgan("dev"));
/** Install JSON request parser */
app.use(express.json());
// /** Install Router */
app.use(router);
exports.default = app;
