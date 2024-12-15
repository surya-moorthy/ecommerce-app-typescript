// import express from 'express';
// import { cartBody } from '../validator/validate';
// import prisma from '../db/db';
// const cart = express();



// cart.post('/',userMiddleware , async (req,res)=>{
//     const {success , data} = cartBody.safeParse(req.body);
//     if(!success){
//         res.status(400).json({ msg  : "Invalid Inputs"})
//         return 
//     }
//     const { product_id , quantity} = data;
//     try {
//         const insertproduct = await prisma.cartItem.create({
//                 productId : product_id,
//                 quantity : quantity
            
//      })
//      res.status(200).json({
//         msg : "product added to the cart"
//      })
//     }catch(e){
//         res.status(400).json({
//             msg : "Exception occured" + e
//         })
//     }


// })
// cart.put('/:id',async (req,res)=>{
//     const quantity = req.body.quantity ;
//     const product_id = parseInt(req.params.id);
//     if(!quantity){
//         res.status(400).json({
//             msg : "Quantity should be given"
//         })
//     }
//    try {
//     const findProduct = await prisma.cartItem.findFirst({
//         where : {
//             productId : product_id
//         }})
//     if(!findProduct){
//         res.status(400).json({  msg : "no such product"})
//     }
//     await prisma.cartItem.update({
//         where : {
//             productId : product_id
//         },
//         data : {
//             quantity : quantity
//         }
//     })

//    }


// })
// cart.delete('/:id',(req,res)=>{
//     const product_id = parseInt(req.params.id);
    

// })

// export default cart