import { Request, Response } from 'express';
import MatchesService from '../Services/MatchesServices';

export default class MatchesController {
  constructor(private matchsService = new MatchesService()) {}

  public AllMatches = async (_req: Request, res: Response) => {
    const result = await this.matchsService.AllMatches();
    return res.status(200).json(result);
  };
}
