const {Sequelize, STRING, UUID, UUIDV4, DATEONLY, ENUM} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers-choice-react-webpack');
const faker = require('faker');

const Task = sequelize.define('Task', {
  heading: {
    type: STRING(50)
  },
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  dueDate:{
    type: DATEONLY
  },
  description: {
    type: STRING
  },
  importance: {
    type: ENUM('1', '2', '3', '4', '5')
  }
})


Task.createRandom = async() => {
  const newTask = await Task.create({
    heading: faker.lorem.sentence(5),
    dueDate: faker.date.future(),
    description: faker.lorem.paragraph(1),
    importance: faker.datatype.number({
      'min': 1,
      'max': 5
    }).toString()
  })
  return newTask;
}

const syncAndSeed = async () => {
  await sequelize.sync({force: true});
  Task.createRandom();
  Task.createRandom();
  Task.createRandom();
  Task.createRandom();
  Task.createRandom();
  Task.createRandom();
  Task.createRandom();
  Task.createRandom();
  Task.createRandom();
  Task.createRandom();
  Task.createRandom();
  
}


module.exports = {
  syncAndSeed,
  Task
}