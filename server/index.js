import { app } from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './src/Db/db.js';

dotenv.config({
  path: '../.env',
});

connectDB()
  .then(() => {
    app.get('/', (req, res) => {
      res.send(`<h1>Welcome to Server<h1/>`);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running on Port : http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log('ERR while running the Server', err);
  });
