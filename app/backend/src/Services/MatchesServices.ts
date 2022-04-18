// import { ResultSetHeader } from 'mysql2/promise';
import IMatches from '../interfaces/IMatches';
import Teams from '../database/models/Teams';
import ICreateMatch from '../interfaces/ICreateMatch';
import Matches from '../database/models/Matches';

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

  public async createMatch(objToCreate: ICreateMatch) {
    const { homeTeam, awayTeam } = objToCreate;

    if (homeTeam === awayTeam) {
      return {
        error: {
          message: 'It is not possible to create a match with two equal teams',
        },
        code: 401,
      };
    }

    try {
      const result = await this.model.create(objToCreate);
      return { result };
    } catch (e) {
      return { error: { message: 'There is no team with such id!' }, code: 404 };
    }
  }
}
