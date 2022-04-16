import Matches from '../database/models/Matches';

export default interface IMatches extends Matches {
  teamHome: {
    teamName: string
  }
  teamAway: {
    teamName: string
  }
}

// interface Match {
//   id: number;
//   homeTeam: number;
//   homeTeamGoals: number;
//   awayTeam: number;
//   awayTeamGoals: number;
//   inProgress: boolean;
// }
