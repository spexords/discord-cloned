using Application.Forms;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubchannelsController : ControllerBase
    {
        private readonly ISubchannelService subchannelService;

        public SubchannelsController(ISubchannelService subchannelService)
        {
            this.subchannelService = subchannelService;
        }

        ///api/subchannels/1
        [HttpGet("{id}")]
        public async Task<ActionResult> Details(Guid id)
        {
            return (Ok(await subchannelService.Details(id)));
        }


        ///api/subchannels/1/messages
        [HttpPost("{id}/messages")]
        public async Task<ActionResult> CreateMessage(Guid id, MessageCreateRequest values)
        {
            await subchannelService.CreateMessage(id, values);
            return Ok();
        }

        ///api/subchannels/1
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await subchannelService.Delete(id);
            return Ok();
        }
    }
}
