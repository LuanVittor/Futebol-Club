'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class matches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  matches.init({
    home_team: DataTypes.NUMBER,
    home_team_goals: DataTypes.NUMBER,
    away_team: DataTypes.NUMBER,
    away_team_goals: DataTypes.NUMBER,
    in_progress: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'matches',
  });
  return matches;
};