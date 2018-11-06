using System;
using System.Collections.Generic;
using ExamGroupIMD.Entities;
using ExamGroupIMD.Business;

namespace ExamGroupIMD.Service
{
    public class ReelService : IReelService
    {
        private readonly IReelBusiness _reelBusiness;

        public ReelService(IReelBusiness reelBusiness)
        {
            _reelBusiness = reelBusiness;
        }

        public IEnumerable<Reel> GetAllReels()
        {
            return _reelBusiness.GetAllReels();
        }

        public Reel GetReelById(int id)
        {
            return _reelBusiness.GetReelById(id);
        }

        public int SaveReel(Reel reel)
        {
            return _reelBusiness.SaveReel(reel);
        }

        public int UpdateReel(Reel reel)
        {
            return _reelBusiness.UpdateReel(reel);
        }

        public int PostReel(Reel reel)
        {
            return _reelBusiness.SaveReel(reel);
        }

        public int DeleteReelById(int id)
        {
            return _reelBusiness.DeleteReelById(id);
        }
    }
}
