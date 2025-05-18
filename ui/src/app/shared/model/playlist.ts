export interface Playlist {
    _id?: string;
    name: string;
    description?: string;
    cover_url?: string;
    trackIds: string[];
    createdBy: string;
    isPublic: boolean;
}