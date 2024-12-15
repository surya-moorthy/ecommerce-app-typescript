import { z } from "zod";

export const RegisterBody = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(8)
})

export const LoginBody = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})

export const productsBody = z.object({
    name : z.string(),
    price : z.number().multipleOf(0.01),
    stock : z.number()
})

export const cartBody = z.object({
    product_id : z.number(),
    quantity : z.number()
})

export const orderBody = z.object({
    cart_id : z.number()
}
)

export const ReviewBody = z.object({
    rating : z.number().multipleOf(0.1),
    comment : z.string()
})

export const WishList = z.object({
    product_id : z.number()
})