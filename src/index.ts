import express from "express"
const app = express();
import main from './routes/main'
app.use('/api/v1',main);
app.use(express.json())
app.listen(3000,()=>{
    console.log("the app is listening to port 3000");}
)