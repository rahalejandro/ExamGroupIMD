using System.Data.Entity.Migrations;
using ExamGroupIMD.Entities;

namespace ExamGroupIMD.Data.Data_Migration
{
    internal sealed class GroupIMDInitializerDB : DbMigrationsConfiguration<ExamGroupIMD.Data.GroupIMD>
    {
        public GroupIMDInitializerDB()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ExamGroupIMD.Data.GroupIMD context)
        {
            context.Clips.AddOrUpdate(
                c => c.Name,
                new Clip
                {
                    Name = "Bud Light",
                    Description = "A factory is working on the new Bud Light Platinum.",
                    Standard = "PAL",
                    Definition = "SD",
                    StartTime = new Timecode(),
                    EndTime = new Timecode { Seconds = 30, Frames = 12 }
                },
                new Clip
                {
                    Name = "M&M's",
                    Description = "At a party, a brown-shelled M&M is mistaken for being naked. As a result, the red M&M tears off its skin and dances to \"Sexy and I Know It\" by LMFAO.",
                    Standard = "NTSC",
                    Definition = "SD",
                    StartTime = new Timecode(),
                    EndTime = new Timecode { Seconds = 15, Frames = 27 }
                },
                new Clip
                {
                    Name = "Audi",
                    Description = "A group of vampires are having a party in the woods. The vampire in charge of drinks(blood types) arrives in his Audi.The bright lights of the car kills all of the vampires, with him wondering where everyone went afterwards.",
                    Standard = "PAL",
                    Definition = "SD",
                    StartTime = new Timecode(),
                    EndTime = new Timecode { Minutes = 1, Seconds = 30 }
                },
                new Clip
                {
                    Name = "Chrysler",
                    Description = "Clint Eastwood recounts how the automotive industry survived the Great Recession.",
                    Standard = "PAL",
                    Definition = "SD",
                    StartTime = new Timecode(),
                    EndTime = new Timecode { Seconds = 10, Frames = 14 }
                },
                new Clip
                {
                    Name = "Fiat",
                    Description = "A man walks through a street to discover a beautiful woman (Catrinel Menghia) standing on a parking space, who proceeds to approach and seduce him, when successfully doing so he then discovered he was about to kiss a Fiat 500 Abarth.",
                    Standard = "NTSC",
                    Definition = "SD",
                    StartTime = new Timecode(),
                    EndTime = new Timecode { Seconds = 18, Frames = 11 }
                },
                new Clip
                {
                    Name = "Pepsi",
                    Description = "People in the Middles Ages try to entertain their king (Elton John) for a Pepsi. While the first person fails, a mysterious person(Season 1 X Factor winner Melanie Amaro) wins the Pepsi by singing Aretha Franklin's \"Respect\". After she wins, she overthrows the king and gives Pepsi to all the town.",
                    Standard = "NTSC",
                    Definition = "SD",
                    StartTime = new Timecode(),
                    EndTime = new Timecode { Seconds = 20 }
                },
                new Clip
                {
                    Name = "Best Buy",
                    Description = "An ad featuring the creators of the cameraphone, Siri, and the first text message.The creators of Words with FriEndTimes also appear parodying the incident involving Alec Baldwin playing the game on an airplane.",
                    Standard = "PAL",
                    Definition = "HD",
                    StartTime = new Timecode(),
                    EndTime = new Timecode { Seconds = 10, Frames = 5 }
                },
                new Clip
                {
                    Name = "Captain America: The First Avenger",
                    Description = "Video Promo",
                    Standard = "PAL",
                    Definition = "HD",
                    StartTime = new Timecode(),
                    EndTime = new Timecode { Seconds = 20, Frames = 10 }
                },
                new Clip
                {
                    Name = "Volkswagen \"Black Beetle\"",
                    Description = "A computer-generated black beetle runs fast, as it is referencing the new Volkswagen model.",
                    Standard = "NTSC",
                    Definition = "HD",
                    StartTime = new Timecode(),
                    EndTime = new Timecode { Seconds = 30 }
                }
            );
        }
    }
}
