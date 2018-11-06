using System;
using ExamGroupIMD.Entities;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace ExamGroupIMD.Data
{
    public interface IGroupIMD : IDisposable
    {
        IDbSet<Reel> Reels { get; set; }
        IDbSet<Clip> Clips { get; set; }
        int SaveChanges();
        void SetEntityState(object entity, EntityState state);
        void SetEntityValues(object entity, object newEntity);
    }
}
