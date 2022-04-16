import ITeams from '../interfaces/ITeams';
import Teams from '../database/models/Teams';

export default class TeamService {
  private model = Teams;

  public async getTeams(): Promise<ITeams[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async getTeamById(id: number): Promise<ITeams | null> {
    const result = await this.model.findOne({ where: { id } });
    return result;
  }
}
