const express = require('express');
const app = express();


const userRouter = require('./routes/userRouter');
const authMiddleware = require('./middleware/authMiddleware');
const AuthController = require('./controller/AuthController');
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))

app.post('/api/login', AuthController.login);
app.use('/api/users', authMiddleware, userRouter)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = { app }