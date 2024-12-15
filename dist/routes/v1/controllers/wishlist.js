"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist = (0, express_1.default)();
wishlist.get('/', (req, res) => {
});
wishlist.post('/', (req, res) => {
});
wishlist.delete('/:id', (req, res) => {
});
exports.default = wishlist;
