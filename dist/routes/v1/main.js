"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const express_1 = require("express");
const auth_1 = require("./controllers/auth");
exports.main = (0, express_1.Router)();
exports.main.use('/auth', auth_1.auth);
