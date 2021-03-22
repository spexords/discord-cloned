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
    public class ChannelsController : ControllerBase
    {
        private readonly IChannelService channelService;

        public ChannelsController(IChannelService channelService)
        {
            this.channelService = channelService;
        }

        ///api/channels
        [HttpGet]
        public async Task<ActionResult<List<ChannelDto>>> GetAll()
        {
            return Ok(await channelService.GetAll());
        }

        ///api/channels
        [HttpPost]
        public async Task<ActionResult> Create(ChannelCreateRequest values)
        {
            await channelService.Create(values);
            return Ok();
        }

        ///api/channels/1
        [HttpDelete("{id}")]
        [Authorize(Policy = "IsChannelCreator")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await channelService.Delete(id);
            return Ok();
        }

        ///api/channels/join
        [HttpPost("join")]
        public async Task<ActionResult<ChannelDto>> Join(ChannelJoinRequest values)
        {
            return Ok(await channelService.Join(values));
        }

        /// api/channels/1/leave
        [HttpPost("{id}/leave")]
        public async Task<ActionResult> Leave(Guid id)
        {
            await channelService.Leave(id);
            return Ok();
        }


        ///api/channels/1/users/2
        [Authorize(Policy = "IsChannelCreator")]
        [HttpDelete("{id}/users/{uid}")]
        public async Task<ActionResult> KickUser(Guid id, Guid uid)
        {
            await channelService.KickUser(id, uid);
            return Ok();
        }


        ///api/channels/id
        [HttpGet("{id}")]
        public async Task<ActionResult<ChannelDetailedDto>> Details(Guid id)
        {
            return Ok(await channelService.Details(id));
        }

        ///api/channels/1/subchannels
        [HttpPost("{id}/subchannels")]
        [Authorize(Policy = "IsChannelCreator")]
        public async Task<ActionResult> CreateSubchannel(Guid id, SubchannelCreateRequest values)
        {
            await channelService.CreateSubchannel(id, values);
            return Ok();
        }

        ///api/channels/1/password
        [HttpPut("{id}/password")]
        [Authorize(Policy = "IsChannelCreator")]
        public async Task<ActionResult> UpdateChannelPassword(Guid id, ChangePasswordRequest values)
        {
            await channelService.UpdateChannelPassword(id, values);
            return Ok();
        }


        ///api/channels/1/users
        [HttpGet("{id}/users")]
        public async Task<ActionResult<List<UserGeneralDto>>> GetChannelUsers(Guid id)
        {
            return Ok(await channelService.GetAllUsers(id));
        }

    }
}
