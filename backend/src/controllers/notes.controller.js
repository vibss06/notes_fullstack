import NotesModel from "../models/notes.models.js";

const createNotesController = async (req, res) => {
  try {
    let { title, description } = req.body;

    let newNote = await NotesModel.create({
      title,
      description,
    });

    return res.status(201).json({
      message: "Note created Succesfully",
      data: newNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error ",
    });
  }
};

const getAllNotesController = async (req, res) => {
  try {
    const allNotes = await NotesModel.find();

    res.status(200).json({
      message: "All notes fetched",
      data: allNotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error ",
    });
  }
};

const getOneNoteController = async (req, res) => {
  try {
    let noteId = req.params.id;

    let note = await NotesModel.findById(noteId);

    res.status(200).json({
      message: "Note Fetched Succesfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error ",
    });
  }
};

const getUpdateController = async (req, res) => {
  try {
    let noteId = req.params.id;
    let body = req.body;

    let updatedNote = await NotesModel.findByIdAndUpdate(noteId, body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Note updated succesfully ",
      data: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error ",
    });
  }
};

const deleteNoteController = async (req, res) => {
  try {
    let delId = req.params.id;

    await NotesModel.findByIdAndDelete(delId);

    return res.status(200).json({
      message: "Note Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error ",
    });
  }
};

const singleEntityController = async (req, res) => {
  try {
    let noteId = req.params.id;
    let body = req.body;

    let updateNote = await NotesModel.findByIdAndUpdate(noteId, body, {
      new: true,
    });

    return res.status(200).json({
      message: "Note updates Succesfully",
      data: updateNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export {
  createNotesController,
  getAllNotesController,
  getOneNoteController,
  getUpdateController,
  deleteNoteController,
  singleEntityController,
};
