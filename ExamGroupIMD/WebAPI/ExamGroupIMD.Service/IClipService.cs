using System;
using System.Collections.Generic;
using ExamGroupIMD.Entities;

namespace ExamGroupIMD.Service
{
    public interface IClipService
    {
        IEnumerable<Clip> GetAllClips();
    }
}
