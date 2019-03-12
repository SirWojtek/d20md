"use strict";

module.exports = function(sequelize, DataTypes) {
  var Monster = sequelize.define('Monster', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty",
        },
        len: {
          args: [2, 100],
          msg: 'Name should be between 2 and 100 characters',
        },
      },
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        'aberration', 'animal', 'construct', 'dragon', 'elemental',
        'fey', 'giant', 'humanoid', 'monstrous humanoid',
        'magical beast', 'ooze', 'outsider', 'plant', 'undead', 'vermin'
      ],
      defaultValue: 'humanoid'
    },
    size: {
      type: DataTypes.ENUM,
      values: [
        'fine', 'diminutive', 'tiny', 'small',
        'medium', 'large', 'huge', 'gargantuan', 'colossal'
      ],
      defaultValue: 'medium'
    },
    hd_sum: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: {
          args: [0],
          msg: 'Hit dice sum cannot be lower than 0',
        },
        max: {
          args: [150],
          msg: 'Hit dice sum cannot be higher than 150',
        },
      },
    },
    armor_sum: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      validate: {
        min: {
          args: [1],
          msg: 'Armor sum cannot be lower than 1',
        },
        max: {
          args: [120],
          msg: 'Armor sum cannot be higher than 120',
        },
      },
    },
    base_attack: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Base attack cannot be lower than 0',
        },
        max: {
          args: [50],
          msg: 'Base attack cannot be higher than 50',
        },
      },
    },
    grapple: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Grapple cannot be lower than 0',
        },
        max: {
          args: [50],
          msg: 'Grapple cannot be higher than 50',
        },
      },
    },
    attack_max: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Attack max cannot be lower than 0',
        },
        max: {
          args: [110],
          msg: 'Attack max cannot be higher than 110',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 1000],
          msg: 'Description cannot be longer than 1000 characters',
        },
      },
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      validate: {
        min: {
          args: [1],
          msg: 'Hit points number cannot be lower than 1',
        },
        max: {
          args: [3000],
          msg: 'Hit points number cannot be higher than 3000',
        },
      },
    },
    initiative: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [-100],
          msg: 'Initiative cannot be lower than -100',
        },
        max: {
          args: [100],
          msg: 'Initiative cannot be greater than 100',
        },
      },
    },
    challenge_rating: {
      type: DataTypes.INTEGER,
      deafultValue: 1,
      validate: {
        min: {
          args: [1],
          msg: 'Challenge rating cannot be lower than 1',
        },
        max: {
          args: [70],
          msg: 'Challenge rating cannot be greater than 70',
        },
      }
    },
    organisation: {
      type: DataTypes.STRING,
      defaultValue: 'none',
      validate: {
        len: {
          args: [2, 100],
          msg: 'Organisation should be between 2 and 100 characters',
        },
      },
    },
    treasure: {
      type: DataTypes.STRING,
      defaultValue: 'none',
      validate: {
        len: {
          args: [2, 100],
          msg: 'Treasure should be between 2 and 100 characters',
        },
      },
    },
    views: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  },
  {
    hooks: {
      beforeDestroy: () => {

      }
    }
  });

  Monster.associate = function(models) {
    Monster.belongsTo(models.User);

    Monster.hasOne(models.Image, {onDelete: 'cascade', hooks: true});
    Monster.hasOne(models.Attribute, {onDelete: 'cascade', hooks: true});
    Monster.hasOne(models.Skill, {onDelete: 'cascade', hooks: true});
    Monster.hasOne(models.Armor, {onDelete: 'cascade', hooks: true});
    Monster.hasOne(models.Save, {onDelete: 'cascade', hooks: true});
    Monster.hasOne(models.Speed, {onDelete: 'cascade', hooks: true});

    Monster.belongsToMany(models.Spell, { through: 'MonsterSpellInstances' });
    Monster.belongsToMany(models.Feat, { through: 'MonsterFeatInstances' });
    Monster.belongsToMany(models.User, { as: 'MonsterViewLogs', through: 'MonsterViewLog' });

    Monster.hasMany(models.AttackGroup, {onDelete: 'cascade', hooks: true});
    Monster.hasMany(models.HitDice, {onDelete: 'cascade', hooks: true});
    Monster.hasMany(models.Special, {onDelete: 'cascade', hooks: true});
    Monster.hasMany(models.EnvironmentTag, {onDelete: 'cascade', hooks: true});
    Monster.hasMany(models.Alignment, {onDelete: 'cascade', hooks: true});
    Monster.hasMany(models.Advancement, {onDelete: 'cascade', hooks: true});
    Monster.hasMany(models.MonsterDescriptor, {onDelete: 'cascade', hooks: true});
  };

  return Monster;
};
