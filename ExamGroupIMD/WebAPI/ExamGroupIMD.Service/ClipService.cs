using System;
using System.Collections.Generic;
using ExamGroupIMD.Entities;
using ExamGroupIMD.Business;

namespace ExamGroupIMD.Service
{
    public class ClipService : IClipService
    {
        private readonly IClipBusiness _clipBusiness;

        public ClipService(IClipBusiness clipBusiness)
        {
            _clipBusiness = clipBusiness;
        }

        public IEnumerable<Clip> GetAllClips()
        {
            return _clipBusiness.GetAllClips();
        }
    }
}
