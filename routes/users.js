const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const Message = require('../models/Message');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

app.post('/message',async (req,res)=>{
  try{
    const message = new Message({
      full_name: req.body.full_name,
      mail:req.body.mail,
      message:req.body.message
    });

    message.save(()=>{

    });

    res.sendStatus(200);
  }catch  {
    res.sendStatus(500);
  }
});



module.exports = app;
