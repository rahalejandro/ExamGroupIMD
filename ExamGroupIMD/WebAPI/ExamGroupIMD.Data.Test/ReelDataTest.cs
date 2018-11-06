using System;
using System.Collections.Generic;
using System.Linq;
using ExamGroupIMD.Entities;
using System.Data.Entity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace ExamGroupIMD.Data.Test
{
    [TestClass]
    public class ReelDataTest
    {
        private Mock<IDbSet<Reel>> _reelMockDbSet;
        private Mock<IDbSet<Clip>> _clipMockDbSet;
        private Mock<IGroupIMD> _dbContext;
        private ReelData _reelData;
        private ICollection<Reel> _reels;
        private ICollection<Clip> _clips;

        [TestInitialize]
        public void TestInitialize()
        {
            _reels = new List<Reel>();
            Reel reel = new Reel()
            {
                ReelId = 10,
                Name = "The Show Reel",
                Standard = "PAL",
                Definition = "SD",
                Clips = new List<Clip>()
            };
            _reels.Add(reel);

            _reelMockDbSet = new Mock<IDbSet<Reel>>();
            _reelMockDbSet.As<IQueryable<Reel>>().Setup(m => m.Provider).Returns(_reels.AsQueryable().Provider);
            _reelMockDbSet.As<IQueryable<Reel>>().Setup(m => m.Expression).Returns(_reels.AsQueryable().Expression);
            _reelMockDbSet.As<IQueryable<Reel>>().Setup(m => m.ElementType).Returns(_reels.AsQueryable().ElementType);
            _reelMockDbSet.As<IQueryable<Reel>>().Setup(m => m.GetEnumerator()).Returns(_reels.AsQueryable().GetEnumerator());

            _clips = new List<Clip>();
            Clip clip = new Clip()
            {
                ClipId = 1,
                Name = "Bud Light",
                Description = "A factory is working on the new Bud Light Platinum.",
                Standard = "PAL",
                Definition = "SD",
                StartTime = new Timecode(),
                EndTime = new Timecode { Seconds = 30, Frames = 12 }
            };
            _clips.Add(clip);

            _clipMockDbSet = new Mock<IDbSet<Clip>>();
            _clipMockDbSet.As<IQueryable<Clip>>().Setup(m => m.Provider).Returns(_clips.AsQueryable().Provider);
            _clipMockDbSet.As<IQueryable<Clip>>().Setup(m => m.Expression).Returns(_clips.AsQueryable().Expression);
            _clipMockDbSet.As<IQueryable<Clip>>().Setup(m => m.ElementType).Returns(_clips.AsQueryable().ElementType);
            _clipMockDbSet.As<IQueryable<Clip>>().Setup(m => m.GetEnumerator()).Returns(_clips.AsQueryable().GetEnumerator());

            _dbContext = new Mock<IGroupIMD>();
            _dbContext.Setup(m => m.Reels).Returns(_reelMockDbSet.Object);
            _dbContext.Setup(m => m.Clips).Returns(_clipMockDbSet.Object);
            _reelData = new ReelData(_dbContext.Object);
        }

        [TestMethod]
        public void ReelData_ShouldCallMethodGetAllReels()
        {
            var result = _reelData.GetAllReels();

            _dbContext.Verify(m => m.Reels, Times.Once);
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ReelData_ShouldCallMethodGetReelById_AndReturnResultById()
        {
            _dbContext.Setup(m => m.Reels.Find(It.IsAny<int>())).Returns(_reels.First());

            var result = _reelData.GetReelById(10);

            _dbContext.Verify(m => m.Reels.Find(It.IsAny<int>()), Times.Once());
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ReelData_ShouldCallMethodSaveReel_AndCreateNewReel()
        {
            Reel reel = new Reel()
            {
                Name = "The Show Reel",
                Standard = "PAL",
                Definition = "SD",
                Clips = new List<Clip>
                {
                    new Clip
                    {
                        ClipId = 1,
                        Name = "Bud Light",
                        Description = "A factory is working on the new Bud Light Platinum.",
                        Standard = "PAL",
                        Definition = "SD",
                        StartTime = new Timecode(),
                        EndTime = new Timecode { Seconds = 30, Frames = 12 }
                    }
                }
            };

            var result = _reelData.SaveReel(reel);

            _dbContext.Verify(m => m.SaveChanges(), Times.Once());
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ReelData_ShouldCallMethodUpdateReel_AndUpdateReel()
        {
            Reel reel = new Reel
            {
                ReelId = 10,
                Name = "The Best Show Reel",
                Standard = "NTSC",
                Definition = "HD",
                Clips = new List<Clip>
                {
                    new Clip
                    {
                        Name = "Volkswagen \"Black Beetle\"",
                        Description = "A computer-generated black beetle runs fast, as it is referencing the new Volkswagen model.",
                        Standard = "NTSC",
                        Definition = "HD",
                        StartTime = new Timecode(),
                        EndTime = new Timecode { Seconds = 30 }
                    }
                }
            };

            var result = _reelData.UpdateReel(reel);

            _dbContext.Verify(m => m.SaveChanges(), Times.Once());
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ReelData_ShouldCallMethodDeleteReelById_AndDeleteReel()
        {
            _dbContext.Setup(m => m.Reels.Find(It.IsAny<int>())).Returns(_reels.First());

            var result = _reelData.DeleteReelById(10);

            _dbContext.Verify(m => m.SaveChanges(), Times.Once());
            Assert.IsNotNull(result);
        }

        [TestMethod]
        [ExpectedException(typeof(NullReferenceException))]
        public void ReelsData_ShouldThrowNullReferenceException_IfSavingNull()
        {
            var result = _reelData.SaveReel(null);
            _dbContext.Verify(m => m.SaveChanges(), Times.Once());
            Assert.IsNull(result);
        }

        [TestMethod]
        [ExpectedException(typeof(NullReferenceException))]
        public void ReelsData_ShouldThrowNullReferenceException_IfUpdatingNull()
        {
            var result = _reelData.UpdateReel(null);
            _dbContext.Verify(m => m.SaveChanges(), Times.Once());
            Assert.IsNull(result);
        }
    }
}
