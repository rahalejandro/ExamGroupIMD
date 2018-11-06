using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ExamGroupIMD.Entities;

namespace ExamGroupIMD.Data
{
    public interface IReelData
    {
        IEnumerable<Reel> GetAllReels();
        Reel GetReelById(int id);
        int SaveReel(Reel reel);
        int UpdateReel(Reel reel);        
        int DeleteReelById(int id);
    }
}
