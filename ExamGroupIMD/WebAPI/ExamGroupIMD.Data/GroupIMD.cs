using System;
using System.Data.Entity;
using ExamGroupIMD.Entities;

namespace ExamGroupIMD.Data
{
    public class GroupIMD : DbContext, IGroupIMD
    {
        public GroupIMD() : base("GroupIMDContext")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<Reel>()
                .HasMany(reel => reel.Clips)
                .WithMany(clip => clip.Reels)
                .Map(showreel =>
                {
                    showreel.MapLeftKey("ReelId");
                    showreel.MapRightKey("ClipId");
                    showreel.ToTable("ShowReel");
                });
        }

        public virtual IDbSet<Reel> Reels { get; set; }

        public virtual IDbSet<Clip> Clips { get; set; }

        public void SetEntityState(object entity, EntityState state)
        {
            Entry(entity).State = state;
        }

        public void SetEntityValues(object entity, object newEntity)
        {
            Entry(entity).CurrentValues.SetValues(newEntity);
        }
    }
}
