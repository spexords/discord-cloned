using Application.DTO;
using Application.Forms;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IChannelService
    {
        Task Create(ChannelCreateRequest values);
        Task CreateSubchannel(Guid channelId, SubchannelCreateRequest values);
        Task DeleteSubchannel(Guid channelId, Guid subchannelId);
        Task Join(ChannelJoinRequest values);
        Task UpdateChannelPassword(Guid id, ChangePasswordRequest values);
        Task<ChannelDetailedDto> Details(Guid id);
        Task Delete(Guid id);
        Task<List<ChannelDto>> GetAll();
        Task CreateMessage(Guid channelId, Guid subchannelId, MessageCreateRequest values);
        Task DeleteMessage(Guid id);
    }
}
