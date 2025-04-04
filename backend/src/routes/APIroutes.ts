import { Router } from "express";
import { ApiController } from "../controllers/ApiControllers";

export const router = Router();
const APIcontrol = new ApiController();

router.get("/getapi", APIcontrol.GetAPiData);
router.put("/updateapi/:id", APIcontrol.UpdateApiDAta);
router.delete("/deleteapi/:id", APIcontrol.DeleteApiData);
