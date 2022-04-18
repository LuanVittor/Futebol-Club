import IMatches from '../interfaces/IMatches';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesService {
  private model = Matches;

  public async AllMatches(): Promise<IMatches[]> {
    const result = await this.model.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: [['team_name', 'teamName']],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: [['team_name', 'teamName']],
        },
      ],
    });
    return result as IMatches[];
  }

  public async MatchesByProgress(progress: string): Promise<IMatches[]> {
    const result = await this.model.findAll({
      where: { inProgress: progress === 'true' ? 1 : 0 },
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: [['team_name', 'teamName']],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: [['team_name', 'teamName']],
        },
      ],
    });
    return result as IMatches[];
  }
}
