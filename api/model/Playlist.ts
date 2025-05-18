import mongoose, { Schema, Document } from 'mongoose';

export interface IPlaylist extends Document {
  name: string;
  trackIds: mongoose.Types.ObjectId[];
  createdBy: string;
  isPublic: boolean;
}

const playlistSchema: Schema<IPlaylist> = new Schema({
  name: { type: String, required: true },
  trackIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'track' }],
  createdBy: { type: String, required: true },
  isPublic: { type: Boolean, default: true },
});

export const Playlist = mongoose.model<IPlaylist>('Playlist', playlistSchema);
