using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IChannelRepository : IGenericRepository<Channel>
    {
        Task<IEnumerable<Channel>> GetAllChannelsByUsernameAsync(string username);
        Task<Channel> FindByIdAndUsernameAsync(Guid id, string username);
    }
}
