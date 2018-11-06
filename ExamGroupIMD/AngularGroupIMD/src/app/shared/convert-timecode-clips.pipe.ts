import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
    name: "convertTimecodeClips",
    pure: false
})

export class ConvertTimeCodeClipsPipe implements PipeTransform {
    transform(clips: any): string {
        if(clips === undefined || clips === null || clips.length === 0) {
            return "00:00:00:00";
        }

        let standard = clips[0].Standard;        
        let frameRate = 0;
        let start = 0, end = 0, frames = 0;
        let hh = 0, mm = 0, ss = 0, ff = 0;
        let zeroPad = "00";

        if(standard == "PAL") {
            frameRate = 25;
        }
        else {
            frameRate = 30;
        }

        clips.forEach((clip) => {
            start = ((clip.StartTime.Hours)*3600 + (clip.StartTime.Minutes)*60 + (clip.StartTime.Seconds))*frameRate + (clip.StartTime.Frames);
            end = ((clip.EndTime.Hours)*3600 + (clip.EndTime.Minutes)*60 + (clip.EndTime.Seconds))*frameRate + (clip.EndTime.Frames);
            frames += (end - start);
        });

        hh = Math.floor(frames / (3600 * frameRate));
        mm = Math.floor((frames / (60 * frameRate)) % 60);
        ss = Math.floor((frames / frameRate) % 60);
        ff = frames % frameRate;

        return (zeroPad + hh.toString()).slice(-2) + ":" + (zeroPad + mm.toString()).slice(-2) + ":" +
               (zeroPad + ss.toString()).slice(-2) + ":" + (zeroPad + ff.toString()).slice(-2);
    }
}