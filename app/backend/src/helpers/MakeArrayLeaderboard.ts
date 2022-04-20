import ILeaderboard from '../interfaces/Leaderboard';
import ITeams from '../interfaces/ITeams';

const makeArrayOfTeams = (teams: ITeams[]) => {
  const leaderboard: ILeaderboard[] = [];

  teams.forEach((team) => leaderboard.push({
    name: team.teamName,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 100,
  }));
  return leaderboard;
};

export default makeArrayOfTeams;
