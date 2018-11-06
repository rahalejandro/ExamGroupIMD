using System;
using System.Collections.Generic;
using ExamGroupIMD.Entities;
using ExamGroupIMD.Data;
using ExamGroupIMD.Business;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace ExamGroupIMD.Business.Test
{
    [TestClass]
    public class ReelBusinessTest
    {
        private Mock<IReelData> _reelData;
        private IReelBusiness _reelBusiness;

        [TestInitialize]
        public void TestInitialize()
        {
            _reelData = new Mock<IReelData>();
            _reelBusiness = new ReelBusiness(_reelData.Object);
        }

        [TestMethod]
        public void ReelsBusiness_ShouldCallGetAllReelsMethod()
        {
            var result = _reelBusiness.GetAllReels();

            _reelData.Verify(m => m.GetAllReels(), Times.Once);
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(IEnumerable<Reel>));
        }

        [TestMethod]
        public void ReelBusiness_ShouldCallMethodGetReelById_AndReturnResultById()
        {
            Reel reel = new Reel()
            {
                ReelId = 10,
                Name = "The Show Reel",
                Standard = "PAL",
                Definition = "HD",
                Clips = new List<Clip>()
            };

            _reelData.Setup(m => m.GetReelById(It.IsAny<int>())).Returns(reel);

            var result = _reelBusiness.GetReelById(10);

            _reelData.Verify(m => m.GetReelById(It.IsAny<int>()), Times.Once());
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ReelsBusiness_ShouldCallMethodSaveReel_AndCreateNewReel()
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

            _reelData.Setup(m => m.SaveReel(It.IsAny<Reel>())).Returns(It.IsAny<int>());

            var result = _reelBusiness.SaveReel(reel);

            _reelData.Verify(m => m.SaveReel(reel), Times.Once());
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ReelsBusiness_ShouldCallMethodUpdateReel_AndUpdateReel()
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

            _reelData.Setup(m => m.UpdateReel(It.IsAny<Reel>())).Returns(It.IsAny<int>());

            var result = _reelBusiness.UpdateReel(reel);

            _reelData.Verify(m => m.UpdateReel(reel), Times.Once());
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void ReelBusiness_ShouldCallMethodDeleteReelById_AndDeleteReel()
        {
            _reelData.Setup(m => m.DeleteReelById(It.IsAny<int>())).Returns(It.IsAny<int>());

            var result = _reelBusiness.DeleteReelById(10);

            _reelData.Verify(m => m.DeleteReelById(It.IsAny<int>()), Times.Once());
            Assert.IsNotNull(result);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void ReelsBusiness_ShouldThrowAnArgumentNullException_IfSavingNull()
        {
            var result = _reelBusiness.SaveReel(null);
            _reelData.Verify(m => m.SaveReel(null), Times.Once());
            Assert.IsNull(result);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void ReelsBusiness_ShouldThrowAnArgumentNullException_IfUpdatingNull()
        {
            var result = _reelBusiness.UpdateReel(null);
            _reelData.Verify(m => m.UpdateReel(null), Times.Once());
            Assert.IsNull(result);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void ReelsBusiness_ShouldThrowAnArgumentException_IfSavingAndStandardsAreDifferent()
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
                        ClipId = 6,
                        Name = "Pepsi",
                        Description = "People in the Middles Ages try to entertain their king (Elton John) for a Pepsi. While the first person fails, a mysterious person (Season 1 X Factor winner Melanie Amaro) " +
                                      "wins the Pepsi by singing Aretha Franklin's \"Respect\". After she wins, she overthrows the king and gives Pepsi to all the town.",
                        Standard = "NTSC",
                        Definition = "SD",
                        StartTime = new Timecode(),
                        EndTime = new Timecode { Seconds = 30, Frames = 12 }
                    }
                }
            };

            _reelData.Setup(m => m.SaveReel(It.IsAny<Reel>())).Returns(It.IsAny<int>());

            var result = _reelBusiness.SaveReel(reel);

            _reelData.Verify(m => m.SaveReel(reel), Times.Once());
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(ArgumentException));
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void ReelsBusiness_ShouldThrowAnArgumentException_IfSavingAndDefinitionsAreDifferent()
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
                        ClipId = 8,
                        Name = "Captain America: The First Avenger",
                        Description = "Video Promo",
                        Standard = "PAL",
                        Definition = "HD",
                        StartTime = new Timecode(),
                        EndTime = new Timecode { Seconds = 30, Frames = 12 }
                    }
                }
            };

            _reelData.Setup(m => m.SaveReel(It.IsAny<Reel>())).Returns(It.IsAny<int>());

            var result = _reelBusiness.SaveReel(reel);

            _reelData.Verify(m => m.SaveReel(reel), Times.Once());
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(ArgumentException));
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void ReelsBusiness_ShouldThrowAnArgumentException_IfUpdatingAndStandardsAreDifferent()
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
                        ClipId = 6,
                        Name = "Pepsi",
                        Description = "People in the Middles Ages try to entertain their king (Elton John) for a Pepsi. While the first person fails, a mysterious person (Season 1 X Factor winner Melanie Amaro) " +
                                      "wins the Pepsi by singing Aretha Franklin's \"Respect\". After she wins, she overthrows the king and gives Pepsi to all the town.",
                        Standard = "NTSC",
                        Definition = "SD",
                        StartTime = new Timecode(),
                        EndTime = new Timecode { Seconds = 30, Frames = 12 }
                    }
                }
            };

            _reelData.Setup(m => m.UpdateReel(It.IsAny<Reel>())).Returns(It.IsAny<int>());

            var result = _reelBusiness.UpdateReel(reel);

            _reelData.Verify(m => m.UpdateReel(reel), Times.Once());
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(ArgumentException));
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void ReelsBusiness_ShouldThrowAnArgumentException_IfUpdatingAndDefinitionsAreDifferent()
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
                        ClipId = 8,
                        Name = "Captain America: The First Avenger",
                        Description = "Video Promo",
                        Standard = "PAL",
                        Definition = "HD",
                        StartTime = new Timecode(),
                        EndTime = new Timecode { Seconds = 30, Frames = 12 }
                    }
                }
            };

            _reelData.Setup(m => m.UpdateReel(It.IsAny<Reel>())).Returns(It.IsAny<int>());

            var result = _reelBusiness.UpdateReel(reel);

            _reelData.Verify(m => m.UpdateReel(reel), Times.Once());
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(ArgumentException));
        }
    }
}
