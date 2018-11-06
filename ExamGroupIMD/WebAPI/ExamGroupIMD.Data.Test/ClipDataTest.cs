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
    public class ClipDataTest
    {
        private Mock<IDbSet<Clip>> _clipMockDbSet;
        private Mock<IGroupIMD> _dbContext;
        private ClipData _clipData;
        private ICollection<Clip> _clips;

        [TestInitialize]
        public void TestInitialize()
        {
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
            _dbContext.Setup(m => m.Clips).Returns(_clipMockDbSet.Object);
            _clipData = new ClipData(_dbContext.Object);
        }

        [TestMethod]
        public void ClipData_ShouldCallMethodGetAllClips()
        {
            var result = _clipData.GetAllClips();

            _dbContext.Verify(m => m.Clips, Times.Once);
            Assert.IsNotNull(result);
        }
    }
}
