using Domain;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class ChannelRepository : GenericRepository<Channel>, IChannelRepository
    {
        public ChannelRepository(DataContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Channel>> GetAllChannelsByUsernameAsync(string username)
        {
            return await context.UserChannels.Where(uc => uc.User.Username == username).Select(uc => uc.Channel).ToListAsync();
        }

        public async Task<Channel> FindByIdAndUsernameAsync(Guid id, string username)
        {
            var userChannel = await context.UserChannels.Where(uc => uc.User.Username == username).FirstOrDefaultAsync(uc => uc.ChannelId == id);
            return userChannel.Channel;
        }

    }
}
