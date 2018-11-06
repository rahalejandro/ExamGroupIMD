using System;
using System.Collections.Generic;
using ExamGroupIMD.Entities;
using ExamGroupIMD.Data;

namespace ExamGroupIMD.Business
{
    public class ReelBusiness : IReelBusiness
    {
        private readonly IReelData _reelData;

        public ReelBusiness(IReelData reelData)
        {
            _reelData = reelData;
        }

        public IEnumerable<Reel> GetAllReels()
        {
            return _reelData.GetAllReels();
        }

        public Reel GetReelById(int id)
        {
            return _reelData.GetReelById(id);
        }

        public int SaveReel(Reel reel)
        {
            ValidateReelObject(reel);

            return _reelData.SaveReel(reel);
        }

        public int UpdateReel(Reel reel)
        {
            ValidateReelObject(reel);

            return _reelData.UpdateReel(reel);
        }

        public int DeleteReelById(int id)
        {
            return _reelData.DeleteReelById(id);
        }

        protected void ValidateReelObject(Reel reel)
        {
            if(reel == null)
            {
                throw new ArgumentNullException("Reel cannot be null.");
            }

            foreach (Clip clip in reel.Clips)
            {
                if (clip == null)
                {
                    throw new ArgumentNullException("Clip cannot be null");
                }

                if (reel.Standard != clip.Standard)
                {
                    throw new ArgumentException("Clip standard does not match the Reel standard.");
                }

                if (reel.Definition != clip.Definition)
                {
                    throw new ArgumentException("Clip definition does not match the Reel definition.");
                }
            }
        }
    }
}
