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
        Task<ChannelDto> Join(ChannelJoinRequest values);
        Task Leave(Guid id);
        Task KickUser(Guid channelId, Guid userId);
        Task UpdateChannelPassword(Guid id, ChangePasswordRequest values);
        Task<ChannelDetailedDto> Details(Guid id);
        Task Delete(Guid id);
        Task<List<ChannelDto>> GetAll();
        Task<List<UserGeneralDto>> GetAllUsers(Guid id);
    }
}
