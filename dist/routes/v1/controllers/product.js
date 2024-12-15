"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product = (0, express_1.default)();
product.get('/', (req, res) => {
});
product.get('/:id', (req, res) => {
});
product.post('/', (req, res) => {
    //product
});
product.put('/', (req, res) => {
    //product
});
product.delete('/', (req, res) => {
    //product
});
exports.default = product;
