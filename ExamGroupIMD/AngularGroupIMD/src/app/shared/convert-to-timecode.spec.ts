import { ConvertToTimeCodePipe } from './convert-to-timecode.pipe';

describe('Covert to TimeCode', () => {

    let pipe: ConvertToTimeCodePipe;

    let timecode = [
        { Hours: 0, Minutes: 0, Seconds: 30, Frames: 12 },
        { Hours: 0, Minutes: 0, Seconds: 10, Frames: 5 },
        { Hours: 0, Minutes: 0, Seconds: 18, Frames: 11 },
        { Hours: 0, Minutes: 0, Seconds: 30, Frames: 0 }
    ];

    beforeEach(() => {
        pipe = new ConvertToTimeCodePipe();
    });

    it('Convert PAL SD TimeCode: 00:00:30:12', () => {
        expect(pipe.transform(timecode[0])).toBe('00:00:30:12');
    });

    it('Convert PAL HD TimeCode: 00:00:10:05', () => {
        expect(pipe.transform(timecode[1])).toBe('00:00:10:05');
    });

    it('Convert NTSC SD TimeCode: 00:00:18:11', () => {
        expect(pipe.transform(timecode[2])).toBe('00:00:18:11');
    });

    it('Convert NTSC HD TimeCode: 00:00:30:00', () => {
        expect(pipe.transform(timecode[3])).toBe('00:00:30:00');
    });
});