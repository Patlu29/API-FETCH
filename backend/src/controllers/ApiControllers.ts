import { Response, Request, NextFunction } from "express";
import {
  UpdateApiData,
  DeleteApiData,
  GetAPIData,
} from "../services/ApiDataServices";

export class ApiController {
  async GetAPiData(req: Request, res: Response, next: NextFunction) {
    try {
      const get = await GetAPIData();
      console.log(req.query.code);
      res.json(get);
    } catch (error) {
      next(error);
    }
  }

  async UpdateApiDAta(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.body) {
        res.status(400).json({ error: "Request body is missing" });
        return;
      }

      const {
        name,
        full_name,
        login,
        created_at,
        updated_at,
        pushed_at,
        language,
      } = req.body || {};
      const id = parseInt(req.params.id, 10); // Convert to number

      if (!id) {
        res.status(400).json({ error: "Invalid ID provided" });
        return;
      }

      const NewApiData = await UpdateApiData(
        id,
        name,
        full_name,
        login,
        created_at,
        updated_at,
        pushed_at,
        language,
        next
      );
      res.json(NewApiData);
    } catch (error) {
      next(error);
    }
  }

  async DeleteApiData(req: Request, res: Response, next: NextFunction) {
    try {
      await DeleteApiData(parseInt(req.params.id, 10));
      res.json({ message: "Deleted API successfully" });
    } catch (error) {
      next(error);
    }
  }
}
