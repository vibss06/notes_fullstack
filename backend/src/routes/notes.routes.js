import express from "express";
import {
  createNotesController,
  getAllNotesController,
  getOneNoteController,
  getUpdateController,
  deleteNoteController,
  singleEntityController,
} from "../controllers/notes.controller.js";

const router = express.Router();

//create
router.post("/create", createNotesController);

//read
router.get("/allNotes", getAllNotesController);

//read One
router.get("/:id", getOneNoteController);

//update
router.put("/:id", getUpdateController);

//delete
router.delete("/:id", deleteNoteController);

//patch
router.patch("/:id", singleEntityController);

export default router;
