import { Router } from "express";
import {
    getUsers,
    getUser,
    insertUser,
    deleteUser,
    editUser,
} from "../controllers/user.controller";

const router: Router = Router();

router.get("/", getUsers);
router.get("/:_id", getUser);
router.post("/", insertUser);
router.put("/:_id", editUser);
router.delete("/:_id", deleteUser);

export default router;
