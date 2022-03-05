const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers-choice-react-webpack');

const syncAndSeed = async () => {
  sequelize.sync({force: true});
}


module.exports = {
  syncAndSeed
}