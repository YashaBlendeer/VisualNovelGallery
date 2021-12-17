const mongoose  = require('mongoose');
const exp  = require('express');
const cors = require('cors');
const passport  = require('passport');
const NovelController  = require('./controllers/NovelController');
const { PORT }  = require('./config');
var Novel = new NovelController.default();
const app = exp();
mongoose.connect('mongodb://localhost:27017/OSWN', {useNewUrlParser: true, useUnifiedTopology: true});
app.set('views', './src/views');
app.set('view engine', 'ejs');



app.use(exp.urlencoded({extended:true}));
app.use(exp.json());
app.use(cors());
app.use(passport.initialize());


app.get('/', function (req, res) {
  res.render('index');
});
app.get('/login-user', function (req, res) {
  res.render('login-user');
});
app.get('/register-user', function (req, res) {
  res.render('register-user');
});
app.get('/create-novel', function (req, res) {
  res.render('create-novel');
});
require("./middlewares/passport")(passport);
app.use('/api/users', require('./routes/users')); 
app.get('/novels',Novel.index);
app.post('/novels/create',Novel.create);
app.get('/novels/:id',Novel.read);
app.delete('/novels/:id',Novel.delete);
app.put('/novels/:id',Novel.update);

app.listen(PORT,()=>{
  console.log('SERVER STARTED!');
  });