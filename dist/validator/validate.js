"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishList = exports.ReviewBody = exports.orderBody = exports.cartBody = exports.productsBody = exports.LoginBody = exports.RegisterBody = void 0;
const zod_1 = require("zod");
exports.RegisterBody = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.LoginBody = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.productsBody = zod_1.z.object({
    name: zod_1.z.string(),
    price: zod_1.z.number().multipleOf(0.01),
    stock: zod_1.z.number()
});
exports.cartBody = zod_1.z.object({
    product_id: zod_1.z.number(),
    quantity: zod_1.z.number()
});
exports.orderBody = zod_1.z.object({
    cart_id: zod_1.z.number()
});
exports.ReviewBody = zod_1.z.object({
    rating: zod_1.z.number().multipleOf(0.1),
    comment: zod_1.z.string()
});
exports.WishList = zod_1.z.object({
    product_id: zod_1.z.number()
});
