import mongoose, { Schema, Document } from 'mongoose';

export interface IAlbum extends Document {
  name: string;
  releaseDate: Date;
  artistName: string;
  length: number;
  genre: string;
  imageUrl: string;
}

const albumSchema: Schema<IAlbum> = new Schema({
  name: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  artistName: { type: String, required: true },
  length: { type: Number, required: true },
  genre: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const Album = mongoose.model<IAlbum>('Album', albumSchema);
