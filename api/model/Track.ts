import mongoose, { Schema, Document } from 'mongoose';

export interface ITrack extends Document {
  title: string;
  artist: string;
  image_url: string;
  video_url: string;
}

const trackSchema: Schema<ITrack> = new Schema({
  title: { type: String, required: true, unique: true },
  artist: { type: String, required: true },
  image_url: { type: String, required: true },
  video_url: { type: String, required: true },
});

export const Track = mongoose.model<ITrack>('Track', trackSchema);
