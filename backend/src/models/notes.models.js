import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: [5, "Minimum 20 char aree required"],
  },
});

const NotesModel = mongoose.model("notes", notesSchema);
export default NotesModel;
