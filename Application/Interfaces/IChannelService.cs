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
        Task UpdateChannelPassword(Guid id, ChangePasswordRequest values);
        Task<ChannelDetailedDto> Details(Guid id);
        Task Delete(Guid id);
        Task<List<ChannelDto>> GetAll();
    }
}
