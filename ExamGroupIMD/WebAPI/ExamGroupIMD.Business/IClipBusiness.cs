using System;
using System.Collections.Generic;
using ExamGroupIMD.Entities;

namespace ExamGroupIMD.Business
{
    public interface IClipBusiness
    {
        IEnumerable<Clip> GetAllClips();
    }
}
