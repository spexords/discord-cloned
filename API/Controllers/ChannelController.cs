using Application.DTO;
using Application.Forms;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
    public class ChannelController : ControllerBase
    {
        private readonly IChannelService channelService;

        public ChannelController(IChannelService channelService)
        {
            this.channelService = channelService;
        }
        [HttpPost]
        public async Task<ActionResult> Create(ChannelCreateRequest values)
        {
            await channelService.Create(values);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<ChannelDto>>> GetAll()
        {
            return Ok(await channelService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ChannelDetailedDto>> Details(Guid id)
        {
            return Ok(await channelService.Details(id));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy= "IsChannelCreator")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await channelService.Delete(id);
            return Ok();
        }

        [HttpPut("{id}/password")]
        [Authorize(Policy = "IsChannelCreator")]
        public async Task<ActionResult> UpdateChannelPassword(Guid id, ChangePasswordRequest values)
        {
            await channelService.UpdateChannelPassword(id, values);
            return Ok();
        }


    }
}
