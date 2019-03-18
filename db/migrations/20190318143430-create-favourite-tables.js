'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('MonsterFavourite', {
        MonsterId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          onDelete: 'cascade',
          onUpdate: 'cascade',
          references: {
            model: "Monsters",
            key: "id"
          }
        },
        UserId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          onDelete: 'cascade',
          onUpdate: 'cascade',
          references: {
            model: "Users",
            key: "id"
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
      queryInterface.createTable('SpellFavourite', {
        SpellId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          onDelete: 'cascade',
          onUpdate: 'cascade',
          references: {
            model: "Spells",
            key: "id"
          }
        },
        UserId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          onDelete: 'cascade',
          onUpdate: 'cascade',
          references: {
            model: "Users",
            key: "id"
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
      queryInterface.createTable('FeatFavourite', {
        FeatId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          onDelete: 'cascade',
          onUpdate: 'cascade',
          references: {
            model: "Feats",
            key: "id"
          }
        },
        UserId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          onDelete: 'cascade',
          onUpdate: 'cascade',
          references: {
            model: "Users",
            key: "id"
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('MonsterFavourite'),
      queryInterface.dropTable('SpellFavourite'),
      queryInterface.dropTable('FeatFavourite'),
    ]);
  }
};
