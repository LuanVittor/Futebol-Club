import { Request, Response } from 'express';
import LeaderboardService from '../Services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public makeLeaderboard = async (_req: Request, res: Response) => {
    const result = await this.leaderboardService.makeLeaderboard();
    return res.status(200).json(result);
  };

  public makeHomeLeaderboard = async (_req: Request, res: Response) => {
    const result = await this.leaderboardService.makeHomeLeaderboard();
    return res.status(200).json(result);
  };

  public makeAwayLeaderboard = async (_req: Request, res: Response) => {
    const result = await this.leaderboardService.makeAwayLeaderboard();
    return res.status(200).json(result);
  };
}
