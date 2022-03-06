const {syncAndSeed, Task} = require('./db/db.js');
const express = require('express');
const app = express();
const path = require('path');


const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.static(path.join(__dirname, '/public')));

const init = async () => {
  await syncAndSeed();
  app.listen(PORT, () => {console.log(`listening on port ${PORT}`)})
}

init();

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.get('/api/tasks', async(req, res, next) => {
  try{
    const tasks = await Task.findAll();
    res.send(tasks);
  }
  catch(error){
    next(error);
  }
  
})

app.get('/api/task/:id', async(req, res, next) => {
  try{
    const task = await Task.findByPk(req.params.id);
    res.send(task);
  }
  catch(error){
    next(error);
  }
})

app.delete('/api/task/:id', async(req, res, next) => {
  try{
    const task = await Task.findByPk(req.params.id);
    task.destroy();
    res.sendStatus(204);
  }
  catch(error){
    next(error);
  }
})

app.post('/api/task', async(req, res, next) => {
  const task = await Task.createRandom();
  res.send(task);
})