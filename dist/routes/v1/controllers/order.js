"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order = (0, express_1.default)();
order.get('/', (req, res) => {
});
order.post('/', (req, res) => {
});
order.get('/:id', (req, res) => {
});
order.put('/:id', (req, res) => {
    //Admin only
});
exports.default = order;
