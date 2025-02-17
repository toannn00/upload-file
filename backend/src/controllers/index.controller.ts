import { Request, Response, NextFunction } from "express";
import { IndexService } from "../services/index.service";

export class IndexController {
  private indexService = new IndexService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = this.indexService.getWelcomeMessage();
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };
}
