import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';

export default class Matches extends Model {
  homeTeam: number;

  homeTeamGoals: number;

  awayTeam: number;

  awayTeamGoals: number;

  inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Matches',
  tableName: 'matches',
});

// Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
// Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' }); // has many foi associado sem necessidade

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });
