import IMatches from '../interfaces/IMatches';
import ILeaderboard from '../interfaces/Leaderboard';

const homeTeamWin = (lastMatch: IMatches, teamArr: ILeaderboard[]) => teamArr.forEach((team) => {
  const oldStats = team;

  if (team.name === lastMatch.teamHome.teamName) {
    oldStats.totalPoints += 3;
    oldStats.totalGames += 1;
    oldStats.totalVictories += 1;
    oldStats.goalsFavor += lastMatch.homeTeamGoals;
    oldStats.goalsOwn += lastMatch.awayTeamGoals;
    oldStats.goalsBalance += lastMatch.homeTeamGoals - lastMatch.awayTeamGoals;
    oldStats.efficiency = +((oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
  }
  if (team.name === lastMatch.teamAway.teamName) {
    oldStats.totalGames += 1;
    oldStats.totalLosses += 1;
    oldStats.goalsFavor += lastMatch.awayTeamGoals;
    oldStats.goalsOwn += lastMatch.homeTeamGoals;
    oldStats.goalsBalance += lastMatch.awayTeamGoals - lastMatch.homeTeamGoals;
    oldStats.efficiency = +((oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
  }
});

const tiedGame = (lastMatch: IMatches, teamArr: ILeaderboard[]) => teamArr.forEach((team) => {
  const oldStats = team;

  if (team.name === lastMatch.teamHome.teamName) {
    oldStats.totalPoints += 1;
    oldStats.totalGames += 1;
    oldStats.totalDraws += 1;
    oldStats.goalsFavor += lastMatch.homeTeamGoals;
    oldStats.goalsOwn += lastMatch.awayTeamGoals;
    oldStats.goalsBalance += lastMatch.homeTeamGoals - lastMatch.awayTeamGoals;
    oldStats.efficiency = +((oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
  } if (team.name === lastMatch.teamAway.teamName) {
    oldStats.totalPoints += 1;
    oldStats.totalGames += 1;
    oldStats.totalDraws += 1;
    oldStats.goalsFavor += lastMatch.awayTeamGoals;
    oldStats.goalsOwn += lastMatch.homeTeamGoals;
    oldStats.goalsBalance += lastMatch.awayTeamGoals - lastMatch.homeTeamGoals;
    oldStats.efficiency = +((oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
  }
});

const awayTeamWin = (lastMatch: IMatches, teamArr: ILeaderboard[]) => teamArr.forEach((team) => {
  const oldStats = team;

  if (team.name === lastMatch.teamHome.teamName) {
    oldStats.totalGames += 1;
    oldStats.totalLosses += 1;
    oldStats.goalsFavor += lastMatch.homeTeamGoals;
    oldStats.goalsOwn += lastMatch.awayTeamGoals;
    oldStats.goalsBalance += lastMatch.homeTeamGoals - lastMatch.awayTeamGoals;
    oldStats.efficiency = +((oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
  } if (team.name === lastMatch.teamAway.teamName) {
    oldStats.totalPoints += 3;
    oldStats.totalGames += 1;
    oldStats.totalVictories += 1;
    oldStats.goalsFavor += lastMatch.awayTeamGoals;
    oldStats.goalsOwn += lastMatch.homeTeamGoals;
    oldStats.goalsBalance += lastMatch.awayTeamGoals - lastMatch.homeTeamGoals;
    oldStats.efficiency = +((oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
  }
});
export {
  homeTeamWin,
  tiedGame,
  awayTeamWin,
};
