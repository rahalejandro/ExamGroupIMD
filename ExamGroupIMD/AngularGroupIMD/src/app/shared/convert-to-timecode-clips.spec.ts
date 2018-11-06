import { IClip } from '../entities/clip';
import { ConvertTimeCodeClipsPipe } from './convert-timecode-clips.pipe';

describe('Calculate total TimeCode of Clips and Convert', () => {

    let pipe: ConvertTimeCodeClipsPipe;

    const clips = [
        { 
            ClipId: 1,
            Name: 'Bud Light',
            Description: 'A factory is working on the new Bud Light Platinum.',
            Standard: 'PAL',
            Definition: 'SD',
            StartTime: { Hours: 0, Minutes: 0, Seconds: 0, Frames: 0 },
            EndTime: { Hours: 0, Minutes: 0, Seconds: 30, Frames: 12 }
        }
    ];
    const clips2 = [
        {
            ClipId: 7,
            Name: 'Best Buy',
            Description: 'An ad featuring the creators of the cameraphone, Siri, and the first text message.The creators of Words with FriEndTimes also appear parodying the incident involving Alec Baldwin playing the game on an airplane.',
            Standard: 'PAL',
            Definition: 'HD',
            StartTime: { Hours: 0, Minutes: 0, Seconds: 0, Frames: 0 },
            EndTime: { Hours: 0, Minutes: 0, Seconds: 10, Frames: 5 }
        },
        {
            ClipId: 8,
            Name: 'Captain America: The First Avenger',
            Description: 'Video Promo',
            Standard: 'PAL',
            Definition: 'HD',
            StartTime: { Hours: 0, Minutes: 0, Seconds: 0, Frames: 0 },
            EndTime: { Hours: 0, Minutes: 0, Seconds: 20, Frames: 10 }
        }
    ];
    const clips3 = [
        {
            ClipId: 5,
            Name: 'Fiat',
            Description: 'A man walks through a street to discover a beautiful woman (Catrinel Menghia) standing on a parking space, who proceeds to approach and seduce him, when successfully doing so he then discovered he was about to kiss a Fiat 500 Abarth.',
            Standard: 'NTSC',
            Definition: 'SD',
            StartTime: { Hours: 0, Minutes: 0, Seconds: 0, Frames: 0 },
            EndTime: { Hours: 0, Minutes: 0, Seconds: 18, Frames: 11 }
        },
        {
            ClipId: 6,
            Name: 'Pepsi',
            Description: 'People in the Middles Ages try to entertain their king (Elton John) for a Pepsi. While the first person fails, a mysterious person(Season 1 X Factor winner Melanie Amaro) wins the Pepsi by singing Aretha Franklin\'s "Respect". After she wins, she overthrows the king and gives Pepsi to all the town.',
            Standard: 'NTSC',
            Definition: 'HD',
            StartTime: { Hours: 0, Minutes: 0, Seconds: 0, Frames: 0 },
            EndTime: { Hours: 0, Minutes: 0, Seconds: 20, Frames: 0 }
        }
    ];
    const clips4 = [
        {
            ClipId: 9,
            Name: 'Volkswagen "Black Beetle"',
            Description: 'A computer-generated black beetle runs fast, as it is referencing the new Volkswagen model.',
            Standard: 'NTSC',
            Definition: 'HD',
            StartTime: { Hours: 0, Minutes: 0, Seconds: 0, Frames: 0 },
            EndTime: { Hours: 0, Minutes: 0, Seconds: 30, Frames: 0 }
        }
    ];

    beforeEach(() => {
        pipe = new ConvertTimeCodeClipsPipe();
    });

    it('Convert PAL SD TimeCode: 00:00:30:12', () => {
        expect(pipe.transform(clips)).toBe('00:00:30:12');
    });

    it('Convert PAL HD TimeCode: 00:0030:15', () => {
        expect(pipe.transform(clips2)).toBe('00:00:30:15');
    });

    it('Convert NTSC SD TimeCode: 00:00:38:11', () => {
        expect(pipe.transform(clips3)).toBe('00:00:38:11');
    });

    it('Convert NTSC HD TimeCode: 00:00:30:00', () => {
        expect(pipe.transform(clips4)).toBe('00:00:30:00');
    });
});