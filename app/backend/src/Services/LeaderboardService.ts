import IMatches from '../interfaces/IMatches';
import TeamService from './TeamsService';
import MatchesService from './MatchesServices';
import makeArrayOfTeams from '../helpers/MakeArrayLeaderboard';
import sortTable from '../helpers/sortLeaderBoard';
import { homeWin, tied, awayWin } from '../helpers/UpdateLeaderBoard';

export default class LeaderboardService {
  private teamService = new TeamService();

  constructor(private matchsService = new MatchesService()) { }

  public async makeLeaderboard() {
    const teams = await this.teamService.getTeams();

    const arrWIthTeams = makeArrayOfTeams(teams);

    const finishedMatches = await this.matchsService.MatchesByProgress('false');
    const treatedMatches = finishedMatches.map((elem) => elem.get({ plain: true })); // para remover datavalues e etc

    treatedMatches.forEach((elem: IMatches) => {
      if (elem.homeTeamGoals > elem.awayTeamGoals) return homeWin(elem, arrWIthTeams, true, true);
      if (elem.homeTeamGoals === elem.awayTeamGoals) return tied(elem, arrWIthTeams, true, true);
      if (elem.homeTeamGoals < elem.awayTeamGoals) return awayWin(elem, arrWIthTeams, true, true);
    });

    return sortTable(arrWIthTeams);
  }

  public async makeHomeLeaderboard() {
    const teams = await this.teamService.getTeams();

    const arrWIthTeams = makeArrayOfTeams(teams);

    const finishedMatches = await this.matchsService.MatchesByProgress('false');
    const treatedMatches = finishedMatches.map((elem) => elem.get({ plain: true })); // para remover datavalues e etc

    treatedMatches.forEach((elem: IMatches) => {
      if (elem.homeTeamGoals > elem.awayTeamGoals) return homeWin(elem, arrWIthTeams, true, false);
      if (elem.homeTeamGoals === elem.awayTeamGoals) return tied(elem, arrWIthTeams, true, false);
      if (elem.homeTeamGoals < elem.awayTeamGoals) return awayWin(elem, arrWIthTeams, true, false);
    });
    return sortTable(arrWIthTeams);
  }

  public async makeAwayLeaderboard() {
    const teams = await this.teamService.getTeams();

    const arrWIthTeams = makeArrayOfTeams(teams);

    const finishedMatches = await this.matchsService.MatchesByProgress('false');
    const treatedMatches = finishedMatches.map((elem) => elem.get({ plain: true })); // para remover datavalues e etc

    treatedMatches.forEach((elem: IMatches) => {
      if (elem.homeTeamGoals > elem.awayTeamGoals) return homeWin(elem, arrWIthTeams, false, true);
      if (elem.homeTeamGoals === elem.awayTeamGoals) return tied(elem, arrWIthTeams, false, true);
      if (elem.homeTeamGoals < elem.awayTeamGoals) return awayWin(elem, arrWIthTeams, false, true);
    });
    return sortTable(arrWIthTeams);
  }
}
