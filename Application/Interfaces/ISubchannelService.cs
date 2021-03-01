using Application.DTO;
using Application.Forms;
using System;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ISubchannelService
    {
        Task<SubchannelDetailedDto> Details(Guid id);
        Task Delete(Guid id);
        Task CreateMessage(Guid id, MessageCreateRequest values);

    }
}
