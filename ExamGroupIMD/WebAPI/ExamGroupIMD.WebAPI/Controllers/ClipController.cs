using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ExamGroupIMD.Entities;
using ExamGroupIMD.Data;
using ExamGroupIMD.Business;
using ExamGroupIMD.Service;

namespace ExamGroupIMD.WebAPI.Controllers
{
    public class ClipController : ApiController
    {
        private IClipService _service;

        public IClipService MockService
        {
            get => _service;
            set => _service = value;
        }

        public ClipController()
        {
            var contextDB = new GroupIMD();
            var _data = new ClipData(contextDB);
            var _business = new ClipBusiness(_data);
            _service = new ClipService(_business);
        }

        [HttpGet]
        public IEnumerable<Clip> GetAllClips()
        {
            return _service.GetAllClips();
        }
    }
}
