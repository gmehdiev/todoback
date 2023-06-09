const axios  = require("axios");
const express = require("express")
const {MongoClient} = require('mongodb')
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');

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







app.use(cors({
    origin: '*',
    
  }));


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

  app.patch('/todolists/:id', async (req, res) => {
    const {id} = req.params
    const {_id, ...post} = req.body; 
    const objectId = new ObjectId(id);
    // const id = post._id;
    const model = client.db().collection('todo');
    
    const updatedModel = await model.findOneAndUpdate(
        { _id: objectId },
        { $set: { ...post } },
        { returnOriginal: false }
      );
    console.log(id)
    console.log({...post})
    // Здесь может быть логика обновления поста
  
    // res.send(`Post ${postId} updated successfully.`);
    return res.status(200).json(updatedModel)
  });


//   app.delete('/todolists/:id', async (req, res) => {
//     const id = new ObjectId(req.params.id);
//     const model = client.db().collection('todo');
//     await model.deleteOne({ _id: ObjectId(id) });
//     res.status(204).send();
//   });


app.listen(3001, () => {
console.log('Server is listening on port 3001!')
})

