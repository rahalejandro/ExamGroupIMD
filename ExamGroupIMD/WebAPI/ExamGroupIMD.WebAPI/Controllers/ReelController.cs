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
    public class ReelController : ApiController
    {
        private IReelService _service;

        public IReelService MockService
        {
            get => _service;
            set => _service = value;
        }

        public ReelController()
        {
            var contextDB = new GroupIMD();
            var _reelData = new ReelData(contextDB);
            var _business = new ReelBusiness(_reelData);
            _service = new ReelService(_business);
        }

        [HttpGet]
        public IEnumerable<Reel> GetAllReels()
        {
            return _service.GetAllReels();
        }

        [HttpGet]
        public Reel GetReelById(int id)
        {
            return _service.GetReelById(id);
        }

        [HttpPost]
        public int SaveReel([FromBody]Reel reel)
        {
            return _service.SaveReel(reel);
        }

        [HttpPut]
        public int UpdateReel([FromBody]Reel reel)
        {
            return _service.UpdateReel(reel);
        }

        [HttpDelete]
        public int DeleteReelById(int id)
        {
            return _service.DeleteReelById(id);
        }
    }
}
