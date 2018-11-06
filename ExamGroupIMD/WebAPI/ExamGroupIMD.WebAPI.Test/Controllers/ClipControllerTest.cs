using System;
using System.Collections.Generic;
using ExamGroupIMD.Entities;
using ExamGroupIMD.Service;
using ExamGroupIMD.WebAPI.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace ExamGroupIMD.WebAPI.Test
{
    [TestClass]
    public class ClipControllerTest
    {
        private Mock<IClipService> _mockService;
        private ClipController _clipController;

        [TestInitialize]
        public void TestInitialize()
        {
            _clipController = new ClipController();
            _mockService = new Mock<IClipService>();
            _clipController.MockService = _mockService.Object;
        }

        [TestMethod]
        public void ClipController_ShoulCallMethodGetAllClips()
        {
            var result = _clipController.GetAllClips();

            _mockService.Verify(m => m.GetAllClips(), Times.Once);
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(IEnumerable<Clip>));
        }
    }
}
