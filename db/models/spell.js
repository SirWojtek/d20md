"use strict";

module.exports = function(sequelize, DataTypes) {
  var Spell = sequelize.define('Spell', {
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty",
        },
        len: {
          args: [2, 100],
          msg: 'Name should be between 2 and 100 characters',
        }
      },
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 15000],
          msg: 'Description cannot be longer than 15000 characters',
        },
      },
    },
    save_type: {
      type: DataTypes.ENUM,
      values: [ 'none', 'reflex', 'fortitude', 'will', 'custom' ],
      defaultValue: 'none',
    },
    permits_sr: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    spell_type: {
      type: DataTypes.ENUM,
      values: [ 'abjuration', 'conjuration', 'divination', 'enchantment', 'evocation', 'illusion', 'necromancy', 'transmutation', 'universal' ],
      defaultValue: 'abjuration',
    },
    spell_range: {
      type: DataTypes.ENUM,
      values: [ 'none', 'self', 'personal', 'touch', 'close', 'medium', 'long', 'unlimited', 'custom' ],
      defaultValue: 'none',
    },
    range_info: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 100],
          msg: 'Range info should be maximum 100 characters',
        }
      },
    },
    target: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 100],
          msg: 'Target should be maximum 100 characters',
        }
      }
    },
    duration: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 100],
          msg: 'Duration should be maximum 100 characters',
        }
      }
    },
    material_component: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 100],
          msg: 'Material component should be maximum 100 characters',
        }
      }
    },
    area: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 100],
          msg: 'Area should be maximum 100 characters',
        }
      }
    },
    effect: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 100],
          msg: 'Effect should be maximum 100 characters',
        }
      }
    },
    xp_cost: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 100],
          msg: 'XP cost should be maximum 100 characters',
        }
      }
    },
    to_develop: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 100],
          msg: 'To develop should be maximum 100 characters',
        }
      }
    },
    views: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  });

  Spell.associate = function(models) {
    Spell.belongsToMany(models.Monster, {through: 'MonsterSpellInstances'});
    Spell.belongsToMany(models.User, { as: 'SpellViewLogs', through: 'SpellViewLog' });
    Spell.belongsToMany(models.User, { as: 'SpellFavourites', through: 'SpellFavourite' });
    Spell.belongsTo(models.User);

    Spell.hasMany(models.SpellLevel, {onDelete: 'cascade', hooks: true});
    Spell.hasMany(models.SpellDescriptor, {onDelete: 'cascade', hooks: true});
    Spell.hasMany(models.SpellComponent, {onDelete: 'cascade', hooks: true});
    Spell.hasMany(models.CastingTime, {onDelete: 'cascade', hooks: true});
  };

  return Spell;
};
