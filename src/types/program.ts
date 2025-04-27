import { Genre } from "./genre.js";

export interface Program {
    id?: number;
    genre_id?: number;
    genre?: Genre;
    name: string;
    duration?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}
