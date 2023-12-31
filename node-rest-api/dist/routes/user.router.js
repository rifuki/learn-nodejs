"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var router = (0, express_1.Router)();
router.get("/", user_controller_1.getUsers);
router.get("/:_id", user_controller_1.getUser);
router.post("/", user_controller_1.insertUser);
router.put("/:_id", user_controller_1.editUser);
router.delete("/:_id", user_controller_1.deleteUser);
exports.default = router;
