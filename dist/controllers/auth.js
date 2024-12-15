"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = require("express");
const validate_1 = require("../validator/validate");
const db_1 = __importDefault(require("../db/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtpassword = process.env.JWT_SECRET;
exports.auth = (0, express_1.Router)();
exports.auth.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { success, data } = validate_1.RegisterBody.safeParse(req.body);
    console.log(data);
    if (!success) {
        res.status(400).json({ msg: "Invalid Inputs" });
        return;
    }
    const { email, password, name } = data;
    try {
        const existingUser = yield db_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ msg: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield db_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        const createCart = yield db_1.default.cart.create({
            data: {
                user: { connect: { id: user.id } }
            }
        });
        res.status(201).json({ msg: "User  registered successfully", user, createCart });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ msg: "An error occurred during registration" });
    }
}));
exports.auth.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = validate_1.LoginBody.safeParse(req.body);
    if (!success) {
        res.status(400).json({ msg: " Invalid Inputs" });
        return;
    }
    const { email, password } = data;
    try {
        const findUser = yield db_1.default.user.findUnique({
            where: {
                email: email
            }
        });
        if (!findUser) {
            res.status(404).json({ msg: "User not found" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, findUser.password);
        if (!isPasswordValid) {
            res.status(400).json({ msg: "Incorrect password" });
        }
        const payload = {
            id: findUser.id,
            email: findUser.email,
            role: findUser.role
        };
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign(payload, jwtpassword || 'default_secret', { expiresIn: '1h' });
        // Return token
        res.status(200).json({
            token: token,
            msg: "Login successful"
        });
    }
    catch (e) {
        console.error("Exception occurred:", e);
        res.status(500).json({ msg: "An internal server error occurred" });
        return;
    }
}));
exports.auth.post('/logout', (req, res) => {
    res.json({ msg: "Logout successfull" });
});
