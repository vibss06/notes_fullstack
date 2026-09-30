import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "./api/axios";
import NoteCard from "./components/NodeCard";
import { useAuth } from "./context/AuthContext.jsx";

const App = () => {
const navigate = useNavigate();
const { user, logout } = useAuth();

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });

  const [allNotes, setAllNotes] = useState([]);

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/notes/create", formValues);

      setFormValues({
        title: "",
        description: "",
      });

      getAllNotes();
    } catch (error) {
      console.log("Error creating note:", error);
    }
  };

  const getAllNotes = async () => {
    try {
      const res = await api.get("/notes/allNotes");

      setAllNotes(res.data.data);
    } catch (error) {
      console.log("Error getting all notes:", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);

      getAllNotes();
    } catch (error) {
      console.log("Error deleting note:", error);
    }
  };

  const updateNote = (note) => {
    console.log(note);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">My Notes</h1>

            <p className="mt-2 text-slate-500">Welcome, {user?.name}</p>
          </div>

          <button
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
            className="rounded-xl bg-red-500 px-5 py-3 font-medium text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Create Note */}
        <div className="mb-10 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            Create a Note
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Enter note title"
              value={formValues.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
            />

            <textarea
              name="description"
              placeholder="Write your note..."
              rows="4"
              value={formValues.description}
              onChange={handleChange}
              minLength={20}
              required
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-700"
            >
              + Add Note
            </button>
          </form>
        </div>

        {/* Notes */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {allNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              deleteNote={deleteNote}
              updateNote={updateNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
