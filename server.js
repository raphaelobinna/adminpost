const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cors =require('cors')
const bodyParser = require('body-parser')

const app = express();

const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));
app.use(cors());



const MONGODB_URI = "mongodb+srv://mychat:mychat@cluster0.m9ikb.mongodb.net/mychat?retryWrites=true&w=majority";

mongoose.connect( process.env.MONGODB_URI || MONGODB_URI, {
   useNewUrlParser: true,
  useUnifiedTopology: true
});



mongoose.connection.on('connected', () => {
  console.log('mongoose is connected')
});

 const Schema = mongoose.Schema;
 const mychatSchema= new Schema({
     title: String,
        body: String
 });

 var mychat = mongoose.model('mychat', mychatSchema);

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended: false}))

//  const data ={
//     title: 'my beginning',
//     body: 'what is my beginning'
// };

//     

 app.get('/api/data', (req, res) => {
     mychat.find({ })
         .then(data =>{
             console.log('data retrieve successful')
             res.json(data)
         } )
         .catch(error => {
             console.log(' check it again')
         })
    
});
app.post('/api', (req,res) => {
   console.log( 'Body: ', req.body)

    const data = req.body

   const newmychat = new mychat(data);

    newmychat.save((error) => {
         if (error) {
             console.log('oops something is wrong')
         } else {
            res.json({
                msg: 'we received your data'
            })
         }
     });
  
})
app.listen(PORT);