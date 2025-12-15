import 'dotenv/config';
import app from './app';
import { connectToDB } from './config/mongoose';

connectToDB()
const port = process.env.PORT || 8050;
app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});