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

    const typeOfFilter = { home: true, away: true };

    treatedMatches.forEach((elem: IMatches) => {
      if (elem.homeTeamGoals > elem.awayTeamGoals) return homeWin(elem, arrWIthTeams, typeOfFilter);
      if (elem.homeTeamGoals === elem.awayTeamGoals) return tied(elem, arrWIthTeams, typeOfFilter);
      if (elem.homeTeamGoals < elem.awayTeamGoals) return awayWin(elem, arrWIthTeams, typeOfFilter);
    });

    return sortTable(arrWIthTeams);
  }

  public async makeHomeLeaderboard() {
    const teams = await this.teamService.getTeams();

    const arrWIthTeams = makeArrayOfTeams(teams);

    const finishedMatches = await this.matchsService.MatchesByProgress('false');
    const treatedMatches = finishedMatches.map((elem) => elem.get({ plain: true })); // para remover datavalues e etc

    const typeOfFilter = { home: true, away: false };

    treatedMatches.forEach((elem: IMatches) => {
      if (elem.homeTeamGoals === elem.awayTeamGoals) return tied(elem, arrWIthTeams, typeOfFilter);
      if (elem.homeTeamGoals > elem.awayTeamGoals) return homeWin(elem, arrWIthTeams, typeOfFilter);
      if (elem.homeTeamGoals < elem.awayTeamGoals) return awayWin(elem, arrWIthTeams, typeOfFilter);
    });
    return sortTable(arrWIthTeams);
  }

  public async makeAwayLeaderboard() {
    const teams = await this.teamService.getTeams();

    const arrWIthTeams = makeArrayOfTeams(teams);

    const finishedMatches = await this.matchsService.MatchesByProgress('false');
    const treatedMatches = finishedMatches.map((elem) => elem.get({ plain: true })); // para remover datavalues e etc

    const typeOfFilter = { home: false, away: true };

    treatedMatches.forEach((elem: IMatches) => {
      if (elem.homeTeamGoals > elem.awayTeamGoals) return homeWin(elem, arrWIthTeams, typeOfFilter);
      if (elem.homeTeamGoals < elem.awayTeamGoals) return awayWin(elem, arrWIthTeams, typeOfFilter);
      if (elem.homeTeamGoals === elem.awayTeamGoals) return tied(elem, arrWIthTeams, typeOfFilter);
    });
    return sortTable(arrWIthTeams);
  }
}
