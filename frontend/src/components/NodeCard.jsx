import React from "react";

const NoteCard = ({ note, deleteNote, updateNote }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-900 mb-3">
        {note.title}
      </h3>

      <p className="text-slate-600 mb-6">
        {note.description.length > 20
          ? note.description.substring(0, 20)
          : note.description}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => {
            updateNote();
          }}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Update
        </button>

        <button
          onClick={() => {
            deleteNote(note._id);
          }}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
