using System;
using System.Collections.Generic;
using ExamGroupIMD.Entities;

namespace ExamGroupIMD.Service
{
    public interface IReelService
    {
        IEnumerable<Reel> GetAllReels();
        Reel GetReelById(int id);
        int SaveReel(Reel reel);
        int UpdateReel(Reel reel);
        int DeleteReelById(int id);
    }
}
