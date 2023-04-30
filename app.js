const axios  = require("axios");
const express = require("express")
const {MongoClient} = require('mongodb')
const { ObjectId } = require('mongodb');
const client = new MongoClient('mongodb+srv://qwerty:qwerty123@cluster0.dmretu6.mongodb.net/?retryWrites=true&w=majority')

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); 
connectDB = async  () => {
    await client.connect();
}

connectDB().then(() => {
    console.log('db connected')
}).catch(console.error)







app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  app.get('/todolist', async (req, res) => {
    const model = client.db().collection('todo');
    const todolist = await model.find().toArray();
    res.json(todolist);
  });



app.post('/biba', async (req, res) => {
    const data = { ...req.body, _id: new ObjectId() };
    const model = await client.db().collection('todo');
    console.log(req.body)
    model.insertOne(data, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Ошибка при сохранении данных' });
      } else {
        console.log(result);
        res.status(200).json({ message: 'Данные успешно сохранены' });
      }
    });
  });

app.listen(3001, () => {
console.log('Server is listening on port 3001!')
})

