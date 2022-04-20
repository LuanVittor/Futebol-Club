import IMatches from '../interfaces/IMatches';
import TeamService from './TeamsService';
import MatchesService from './MatchesServices';
import makeArrayOfTeams from '../helpers/MakeArrayLeaderboard';
import sortTable from '../helpers/sortLeaderBoard';
import { homeTeamWin, tiedGame, awayTeamWin } from '../helpers/UpdateLeaderBoard';

export default class LeaderboardService {
  private teamService = new TeamService();

  constructor(private matchsService = new MatchesService()) {}

  public async makeLeaderboard() {
    const teams = await this.teamService.getTeams();

    const arrayWIthTeams = makeArrayOfTeams(teams);

    const finishedMatches = await this.matchsService.MatchesByProgress('false');
    const treatedMatches = finishedMatches.map((elem) => elem.get({ plain: true })); // para remover datavalues e etc

    treatedMatches.forEach((elem: IMatches) => {
      if (elem.homeTeamGoals > elem.awayTeamGoals) return homeTeamWin(elem, arrayWIthTeams);
      if (elem.homeTeamGoals === elem.awayTeamGoals) return tiedGame(elem, arrayWIthTeams);
      if (elem.homeTeamGoals < elem.awayTeamGoals) return awayTeamWin(elem, arrayWIthTeams);
    });

    return sortTable(arrayWIthTeams);
  }
}
