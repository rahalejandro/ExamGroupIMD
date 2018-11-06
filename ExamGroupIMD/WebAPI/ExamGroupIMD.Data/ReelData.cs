using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using ExamGroupIMD.Entities;

namespace ExamGroupIMD.Data
{
    public class ReelData : IReelData
    {
        private readonly IGroupIMD _db;

        public ReelData(IGroupIMD db)
        {
            _db = db;
        }

        public IEnumerable<Reel> GetAllReels()
        {
            var reels = from reel in _db.Reels select reel;
            return reels.ToList();
        }

        public Reel GetReelById(int id)
        {
            return _db.Reels.Find(id);
        }

        public int SaveReel(Reel reel)
        {
            _db.Reels.Add(reel);
            if (reel.Clips != null)
            {
                foreach (Clip clip in reel.Clips)
                {
                    _db.Clips.Attach(clip);
                }
            }
            return _db.SaveChanges();
        }

        public int UpdateReel(Reel reel)
        {
            Reel currReel = (from r in _db.Reels where r.ReelId == reel.ReelId select r).FirstOrDefault();

            if (reel.Clips == null)
            {
                reel.Clips = new List<Clip>();
            }

            List<Clip> clipsToAdd = new List<Clip>();

            foreach (Clip clip in reel.Clips.ToList())
            {
                if (currReel != null)
                {
                    bool match = false;
                    foreach (Clip clip2 in currReel.Clips.ToList())
                    {
                        if (clip2.ClipId == clip.ClipId)
                        {
                            match = true;
                            break;
                        }
                    }
                    if (!match)
                    {
                        clipsToAdd.Add(clip);
                    }
                }
            }

            List<Clip> clipsToDelete = new List<Clip>();

            if (currReel != null)
            {
                foreach (Clip clip in currReel.Clips.ToList())
                {
                    bool match = false;
                    foreach (Clip clip2 in reel.Clips.ToList())
                    {
                        if (clip2.ClipId == clip.ClipId)
                        {
                            match = true;
                            break;
                        }
                    }

                    if (!match)
                    {
                        clipsToDelete.Add(clip);
                    }
                }

                foreach (Clip clip in clipsToAdd.ToList())
                {
                    if (clip.ClipId > 0)
                    {
                        _db.SetEntityState(clip, EntityState.Unchanged);
                    }
                    currReel.Clips.Add(clip);
                }

                foreach (Clip clip in clipsToDelete.ToList())
                {
                    currReel.Clips.Remove(clip);
                }
            }

            _db.SetEntityValues(currReel, reel);
            return _db.SaveChanges();
        }

        public int DeleteReelById(int id)
        {
            Reel reel = _db.Reels.Find(id);
            if (reel != null)
            {
                reel.Clips.Clear();
                _db.Reels.Remove(reel);
            }
            return _db.SaveChanges();
        }
    }
}
