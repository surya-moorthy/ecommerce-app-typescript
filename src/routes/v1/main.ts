import  { Router } from 'express';
import {auth} from '../../controllers/auth';

export const main = Router();

main.use('/auth',auth);
