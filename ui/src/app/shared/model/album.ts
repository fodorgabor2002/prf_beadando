export interface Album {
    _id?: string;
    name: string;
    releaseDate: Date; 
    artistName: string;
    length: number;
    genre: string;
    imageUrl: string;
}