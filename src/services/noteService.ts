import axios from "axios";
import type { Note } from "../types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export type CreateNotePayload = {
  title: string;
  content: string;
  tag: string;
};

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", { params });
  return response.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await api.post<Note>("/notes", payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}