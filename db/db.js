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
let heading;
let description;
let seed = faker.datatype.number({
  'min': 1,
  'max': 5
});

if(seed === 1){
  heading = `Purchase ${faker.commerce.color()} paint.`
  description = `${faker.name.firstName()} wants me to buy paint for ${faker.company.companyName()}
  so that they can be ${faker.company.bsAdjective()} and meet their goal of being a ${faker.company.catchPhrase().toLowerCase()}.`;
}
else if (seed === 2){
  heading = `Call ${faker.name.firstName()}`
  description = `Need to talk to ${faker.name.lastName()}
  to decide what ${faker.name.jobType()} to ${faker.company.bsBuzz()} the project.`

}
else if (seed === 3){
  heading = `Schedule meeting with ${faker.name.firstName()} and ${faker.name.firstName()}`;
  description = `Schedule a meeting to ${faker.company.bsBuzz()} the addition of a ${faker.company.catchPhraseNoun()}
  in order to reduce ${faker.company.bsAdjective()} ${faker.company.catchPhraseNoun()}.`
}
else if (seed === 4){
  heading = `Review production of ${faker.commerce.productName()}`;
  description = `Check the efficiency of ${faker.commerce.productAdjective()} vs ${faker.commerce.productAdjective()}
  when manufacturing these in ${faker.address.country()}.`
  
}
else{
  heading = `${faker.hacker.verb()} the ${faker.hacker.noun()}`;
  description = faker.hacker.phrase();
  
}



  const newTask = await Task.create({
    heading: heading,
    dueDate: faker.date.future(),
    description: description,
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