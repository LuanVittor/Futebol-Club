import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  id: number;

  team_name: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  team_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Teams',
  tableName: 'teams',
});

export default Teams;
