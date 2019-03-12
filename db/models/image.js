"use strict";

module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    path: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [0, 512],
          msg: 'Image path cannot be longer than 512 characters',
        },
      },
    }
  });

  return Image;
};
