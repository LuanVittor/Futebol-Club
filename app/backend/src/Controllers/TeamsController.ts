import { Request, Response } from 'express';
import TeamService from '../Services/TeamsService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public getAllTeams = async (_req: Request, res: Response) => {
    const result = await this.teamService.getTeams();
    return res.status(200).json(result);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.teamService.getTeamById(+id);
    return res.status(200).json(result);
  };
}
