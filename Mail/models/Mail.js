module.exports = (sequelize, Sequelize) => {
  const Mails = sequelize.define('mails', {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
     
    },
    name: {
      type: Sequelize.STRING,
      primaryKey: true
      
    },
    priority :{
      type:Sequelize.ENUM("High", "Medium", "Low")
      // ENUM(1,2,3),
    },
    dep:{
      type: Sequelize.STRING,
      
    },
    times:{
      type: Sequelize.STRING,
    },
  
  }, {
    // Other model options go here
  });
  
  return Mails;
  }