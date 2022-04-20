import { Request, Response } from 'express';
import MatchesService from '../Services/MatchesServices';

export default class MatchesController {
  constructor(private matchsService = new MatchesService()) {}

  public AllMatches = async (req: Request, res: Response) => {
    const progress = req.query.inProgress;

    if (progress !== undefined) {
      const progressString = String(progress);
      const result = await this.matchsService.MatchesByProgress(progressString);
      console.log(result);
      return res.status(200).json(result);
    }

    const result = await this.matchsService.AllMatches();
    return res.status(200).json(result);
  };

  public createMatch = async (req: Request, res: Response) => {
    const objToCreate = req.body;

    const result = await this.matchsService.createMatch(objToCreate);

    if (result.error) return res.status(result.code).json(result.error);
    return res.status(201).json(result.result);
  };

  public endMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.matchsService.endMatch(+id);
    return res.status(result.code).json(result.message);
  };

  public editScore = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const result = await this.matchsService.editScore(+id, homeTeamGoals, awayTeamGoals);
    return res.status(result.code).json(result.message);
  };
}
