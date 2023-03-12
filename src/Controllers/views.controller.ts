import Handlebars from "handlebars";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { CustomResponse } from "../Lib/Response";

export class ViewsController {
  static async renderIndex(_: Request, res: Response) {
    try {
      const _html = fs.readFileSync(path.join(__dirname, "../../Views/index.html"), "utf8");
      const template = Handlebars.compile(_html);
      const html = template({ PORT: process.env.PORT || 8080 });
      res.status(200).send(html);
    } catch (error) {
      if (error instanceof Error) {
        console.log("🚀 ~ file: views.controller.ts:15 ~ ViewsController ~ renderIndex ~ error:", error)
        res.status(500).json(CustomResponse.error(error, 500, error.message));
      }
    }
  }
}