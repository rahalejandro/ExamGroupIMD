import { IShowReel } from '../entities/showreel';

export interface IClip {
    ClipId: number;
    Name: string;
    Description: string;
    Standard: string;
    Definition: string;
    StartTime: any;
    EndTime: any;
    Reels: IShowReel[];
    isChecked: boolean;
}