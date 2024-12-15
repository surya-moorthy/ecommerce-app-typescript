"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review = (0, express_1.default)();
//the route is /products/:id/reviews
review.get('/', (req, res) => {
    //review
});
review.post('/', (req, res) => {
    //review
});
exports.default = review;
