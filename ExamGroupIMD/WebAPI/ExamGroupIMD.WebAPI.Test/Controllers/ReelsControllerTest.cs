using System;
using System.Collections.Generic;
using ExamGroupIMD.Entities;
using ExamGroupIMD.Service;
using ExamGroupIMD.WebAPI.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace WebAPIUnitTest.Controllers
{
    [TestClass]
    public class ReelsControllerTest
    {
        private Mock<IReelService> _mockService;
        private ReelController _reelsController;

        [TestInitialize]
        public void TestInitialize()
        {
            _mockService = new Mock<IReelService>();
            _reelsController = new ReelController();
            _reelsController.MockService = _mockService.Object;
        }

        [TestMethod]
        public void ReelsController_ShouldCallGetReelsMethod_AndReturnAllReels()
        {
            var result = _reelsController.GetAllReels();

            _mockService.Verify(m => m.GetAllReels(), Times.Once);
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(IEnumerable<Reel>));
        }

        [TestMethod]
        public void ReelsController_ShouldCallGetReelByIdMethod_AndReturnResultById()
        {
            _mockService.Setup(x => x.GetReelById(10)).Returns(new Reel { ReelId = 10 });
            _reelsController = new ReelController();
            _reelsController.MockService = _mockService.Object;

            var result = _reelsController.GetReelById(10);

            _mockService.Verify(m => m.GetReelById(10), Times.Once);
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(Reel));
        }

        [TestMethod]
        public void ReelsController_ShouldCallSaveReelMethod_AndCreateNewReel()
        {
            var reel = GetTestObject();

            var result = _reelsController.SaveReel(reel);

            _mockService.Verify(m => m.SaveReel(reel), Times.Once);
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(int));
        }

        [TestMethod]
        public void ReelsController_ShouldCallUpdateReelMethod_AndUpdateReel()
        {
            var reel = GetTestObject();

            var result = _reelsController.UpdateReel(reel);

            _mockService.Verify(m => m.UpdateReel(reel), Times.Once);
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(int));
        }

        [TestMethod]
        public void ReelsController_ShouldCallDeleteReelByIdMethod_AndDeleteReel()
        {
            var result = _reelsController.DeleteReelById(10);

            _mockService.Verify(m => m.DeleteReelById(10), Times.Once);
            Assert.IsInstanceOfType(result, typeof(int));
        }

        private Reel GetTestObject()
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

            return reel;
        }
    }
}
