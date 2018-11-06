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
    public class ClipBusinessTest
    {
        private Mock<IClipData> _clipData;
        private IClipBusiness _clipBusiness;

        [TestInitialize]
        public void TestInitialize()
        {
            _clipData = new Mock<IClipData>();
            _clipBusiness = new ClipBusiness(_clipData.Object);
        }

        [TestMethod]
        public void ClipsBusiness_ShouldCallGetAllClipsMethod()
        {
            var result = _clipBusiness.GetAllClips();

            _clipData.Verify(m => m.GetAllClips(), Times.Once);
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(IEnumerable<Clip>));
        }
    }
}
