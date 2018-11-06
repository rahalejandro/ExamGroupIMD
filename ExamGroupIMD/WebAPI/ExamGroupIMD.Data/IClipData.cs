using System;
using System.Collections.Generic;
using ExamGroupIMD.Entities;

namespace ExamGroupIMD.Data
{
    public interface IClipData
    {
        IEnumerable<Clip> GetAllClips();
    }
}
