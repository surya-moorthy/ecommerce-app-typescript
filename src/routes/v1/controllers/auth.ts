import  { Router } from 'express';
import { LoginBody, RegisterBody } from '../validator/validate';
import prisma from '../db/db';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const jwtpassword = process.env.JWT_SECRET;
export const auth = Router();

auth.post('/register', async (req, res) => {
    console.log(req.body);  
    const { success, data } = RegisterBody.safeParse(req.body);
    console.log(data);
    if (!success) {
         res.status(400).json({ msg: "Invalid Inputs" });
         return
    }

    const { email , password, name } = data;

    try {
        const existingUser  = await prisma.user.findUnique({ where: { email } });

        if (existingUser ) {
             res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        }); 
        const createCart = await prisma.cart.create({
            data : {
                user : { connect : { id : user.id}}
            }
        })


        res.status(201).json({ msg: "User  registered successfully", user ,createCart});
    } catch (error) {
        console.error("Registration error:", error);
         res.status(500).json({ msg: "An error occurred during registration" });
    }
});

auth.post('/login',async (req,res)=>{
    const {success,data} = LoginBody.safeParse(req.body);
    if(!success){ 
        res.status(400).json({ msg : " Invalid Inputs" })
        return 
    }
    const {email , password } = data;
    try {
        const findUser : any = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!findUser) {
             res.status(404).json({ msg: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, findUser.password);
        if (!isPasswordValid) {
             res.status(400).json({ msg: "Incorrect password" });
        }
        const payload = {
            id: findUser.id,
            email: findUser.email,
            role: findUser.role
        };
    
        // Generate JWT token
        const token = jwt.sign(payload, jwtpassword || 'default_secret', { expiresIn: '1h' });
    
        // Return token
         res.status(200).json({
            token: token,
            msg: "Login successful"
        });
    
    } catch (e) {
        console.error("Exception occurred:", e);
         res.status(500).json({ msg: "An internal server error occurred" });
         return
    }
    
})

auth.post('/logout',(req,res)=>{
    res.json({msg : "Logout successfull" })
})
