using System;
using System.Collections.Generic;
using ExamGroupIMD.Entities;
using ExamGroupIMD.Data;

namespace ExamGroupIMD.Business
{
    public class ClipBusiness : IClipBusiness
    {
        private readonly IClipData _clipData;

        public ClipBusiness(IClipData clipData)
        {
            _clipData = clipData;
        }

        public IEnumerable<Clip> GetAllClips()
        {
            return _clipData.GetAllClips();
        }
    }
}
