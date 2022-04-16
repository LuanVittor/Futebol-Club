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
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return result as IMatches[];
  }
}
