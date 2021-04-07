module.exports = (db, type) => {
    return db.define('product', {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: type.STRING,
        allowNull: false
      },
      image_url: {
        type: type.STRING,
        allowNull: false,
        default:'not available' 
      },
    })
  }