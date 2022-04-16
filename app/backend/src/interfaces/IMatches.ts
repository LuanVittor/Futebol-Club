import Matches from '../database/models/Matches';

// extends para ter o retorno padrao de todas as info ja passadas no model
export default interface IMatches extends Matches {
  teamHome: {
    teamName: string
  }
  teamAway: {
    teamName: string
  }
}
