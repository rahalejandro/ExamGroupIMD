using System;
using System.Collections.Generic;
using ExamGroupIMD.Entities;

namespace ExamGroupIMD.Business
{
    public interface IReelBusiness
    {
        IEnumerable<Reel> GetAllReels();
        Reel GetReelById(int id);
        int SaveReel(Reel reel);
        int UpdateReel(Reel reel);
        int DeleteReelById(int id);
    }
}
