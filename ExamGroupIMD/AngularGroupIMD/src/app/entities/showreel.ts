import { IClip } from '../entities/clip';

export interface IShowReel {
    ReelId: number;
    Name: string;
    Standard: string;
    Definition: string;
    Clips: IClip[];
}