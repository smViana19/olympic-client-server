const sequelize = require('./config/config');
const User = require('./models/User');

sequelize.sync({ force: true }).then(() => {
    console.log("Banco de dados sincronizado com sucesso.");
}).catch((error) => {
    console.error("Erro ao sincronizar o banco de dados: ", error)
});