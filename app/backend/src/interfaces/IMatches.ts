import Matches from '../database/models/Matches';

export default interface IMatches extends Matches {
  teamHome: {
    teamName: string
  }
  teamAway: {
    teamName: string
  }
}
