import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
    name: "convertToTimeCode"
})

export class ConvertToTimeCodePipe implements PipeTransform {
    transform(timecode: any): string {
        if(timecode === undefined) {
            return "00:00:00:00";
        }

        var zeroPad = "00";

        return (zeroPad + timecode.Hours.toString()).slice(-zeroPad.length) + ":" + (zeroPad + timecode.Minutes.toString()).slice(-zeroPad.length) + ":" +
               (zeroPad + timecode.Seconds.toString()).slice(-zeroPad.length) + ":" + (zeroPad + timecode.Frames.toString()).slice(-zeroPad.length);
    }
}