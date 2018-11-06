namespace ExamGroupIMD.Data.Data_Migration
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Clips",
                c => new
                    {
                        ClipId = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 100),
                        Description = c.String(maxLength: 500),
                        Standard = c.String(),
                        Definition = c.String(),
                        StartTime_Hours = c.Int(nullable: false),
                        StartTime_Minutes = c.Int(nullable: false),
                        StartTime_Seconds = c.Int(nullable: false),
                        StartTime_Frames = c.Int(nullable: false),
                        EndTime_Hours = c.Int(nullable: false),
                        EndTime_Minutes = c.Int(nullable: false),
                        EndTime_Seconds = c.Int(nullable: false),
                        EndTime_Frames = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ClipId);
            
            CreateTable(
                "dbo.Reels",
                c => new
                    {
                        ReelId = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 100),
                        Standard = c.String(),
                        Definition = c.String(),
                    })
                .PrimaryKey(t => t.ReelId);
            
            CreateTable(
                "dbo.ShowReel",
                c => new
                    {
                        ReelId = c.Int(nullable: false),
                        ClipId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ReelId, t.ClipId })
                .ForeignKey("dbo.Reels", t => t.ReelId, cascadeDelete: true)
                .ForeignKey("dbo.Clips", t => t.ClipId, cascadeDelete: true)
                .Index(t => t.ReelId)
                .Index(t => t.ClipId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ShowReel", "ClipId", "dbo.Clips");
            DropForeignKey("dbo.ShowReel", "ReelId", "dbo.Reels");
            DropIndex("dbo.ShowReel", new[] { "ClipId" });
            DropIndex("dbo.ShowReel", new[] { "ReelId" });
            DropTable("dbo.ShowReel");
            DropTable("dbo.Reels");
            DropTable("dbo.Clips");
        }
    }
}
