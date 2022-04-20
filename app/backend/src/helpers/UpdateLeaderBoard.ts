import IMatches from '../interfaces/IMatches';
import ILeaderboard from '../interfaces/Leaderboard';

const homeWin = (ltsGame: IMatches, tmArr: ILeaderboard[], home: boolean, away: boolean) => tmArr.forEach((team) => { // tm = team && lts latest (lint nao deixa lenght)
  const oldStats = team;

  if (home === true && team.name === ltsGame.teamHome.teamName) {
    oldStats.totalPoints += 3;
    oldStats.totalGames += 1;
    oldStats.totalVictories += 1;
    oldStats.goalsFavor += ltsGame.homeTeamGoals;
    oldStats.goalsOwn += ltsGame.awayTeamGoals;
    oldStats.goalsBalance += ltsGame.homeTeamGoals - ltsGame.awayTeamGoals;
    oldStats.efficiency = +((oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
  }
  if (away === true && team.name === ltsGame.teamAway.teamName) {
    oldStats.totalGames += 1;
    oldStats.totalLosses += 1;
    oldStats.goalsFavor += ltsGame.awayTeamGoals;
    oldStats.goalsOwn += ltsGame.homeTeamGoals;
    oldStats.goalsBalance += ltsGame.awayTeamGoals - ltsGame.homeTeamGoals;
    oldStats.efficiency = +((oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
  }
});

const tied = (ltsGame: IMatches, tmArr: ILeaderboard[], home: boolean, away: boolean) => tmArr.forEach((team) => {
  const oldStats = team;

  if (home === true && team.name === ltsGame.teamHome.teamName) {
    oldStats.totalPoints += 1;
    oldStats.totalGames += 1;
    oldStats.totalDraws += 1;
    oldStats.goalsFavor += ltsGame.homeTeamGoals;
    oldStats.goalsOwn += ltsGame.awayTeamGoals;
    oldStats.goalsBalance += ltsGame.homeTeamGoals - ltsGame.awayTeamGoals;
    oldStats.efficiency = +((oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
  } if (away === true && team.name === ltsGame.teamAway.teamName) {
    oldStats.totalPoints += 1;
    oldStats.totalGames += 1;
    oldStats.totalDraws += 1;
    oldStats.goalsFavor += ltsGame.awayTeamGoals;
    oldStats.goalsOwn += ltsGame.homeTeamGoals;
    oldStats.goalsBalance += ltsGame.awayTeamGoals - ltsGame.homeTeamGoals;
    oldStats.efficiency = +((oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
  }
});

const awayWin = (ltsGame: IMatches, tmArr: ILeaderboard[], home: boolean, away: boolean) => tmArr.forEach((team) => {
  const oldStats = team;

  if (home === true && team.name === ltsGame.teamHome.teamName) {
    oldStats.totalGames += 1;
    oldStats.totalLosses += 1;
    oldStats.goalsFavor += ltsGame.homeTeamGoals;
    oldStats.goalsOwn += ltsGame.awayTeamGoals;
    oldStats.goalsBalance += ltsGame.homeTeamGoals - ltsGame.awayTeamGoals;
    oldStats.efficiency = +((oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
  } if (away === true && team.name === ltsGame.teamAway.teamName) {
    oldStats.totalPoints += 3;
    oldStats.totalGames += 1;
    oldStats.totalVictories += 1;
    oldStats.goalsFavor += ltsGame.awayTeamGoals;
    oldStats.goalsOwn += ltsGame.homeTeamGoals;
    oldStats.goalsBalance += ltsGame.awayTeamGoals - ltsGame.homeTeamGoals;
    oldStats.efficiency = +((oldStats.totalPoints / (oldStats.totalGames * 3)) * 100).toFixed(2);
  }
});
export {
  homeWin,
  tied,
  awayWin,
};
