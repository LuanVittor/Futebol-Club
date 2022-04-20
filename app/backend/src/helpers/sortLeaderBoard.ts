import ILeaderboard from '../interfaces/Leaderboard';

const sortTable = (leaderboard: ILeaderboard[]) => leaderboard.sort((TeamONe, TeamTwo) => {
  if (TeamONe.totalPoints < TeamTwo.totalPoints) return 1;
  if (TeamONe.totalPoints > TeamTwo.totalPoints) return -1;
  if (TeamONe.totalVictories < TeamTwo.totalVictories) return 1;
  if (TeamONe.totalVictories > TeamTwo.totalVictories) return -1;
  if (TeamONe.goalsBalance < TeamTwo.goalsBalance) return 1;
  if (TeamONe.goalsBalance > TeamTwo.goalsBalance) return -1;
  if (TeamONe.goalsFavor < TeamTwo.goalsFavor) return 1;
  if (TeamONe.goalsFavor > TeamTwo.goalsFavor) return -1;
  if (TeamONe.goalsOwn < TeamTwo.goalsOwn) return 1;
  if (TeamONe.goalsOwn > TeamTwo.goalsOwn) return -1;
  return 0;
});

export default sortTable;
// https://www.w3schools.com/js/js_array_sort.asp
