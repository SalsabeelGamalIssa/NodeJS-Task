module.exports = (db, type) => {
    return db.define('category', {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: type.STRING,
        allowNull: false,
        
      }
    })
  }