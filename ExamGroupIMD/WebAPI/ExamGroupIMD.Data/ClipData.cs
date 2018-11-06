using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using ExamGroupIMD.Entities;

namespace ExamGroupIMD.Data
{
    public class ClipData : IClipData
    {
        private readonly IGroupIMD _db;

        public ClipData(IGroupIMD db)
        {
            _db = db;
        }

        public IEnumerable<Clip> GetAllClips()
        {
            var clips = from clip in _db.Clips select clip;
            return clips.ToList();
        }
    }
}
