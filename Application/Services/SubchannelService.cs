using Application.Errors;
using Application.Forms;
using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class SubchannelService : ISubchannelService
    {
        private readonly DataContext dataContext;
        private readonly IUserAccessor userAccessor;

        public SubchannelService(DataContext dataContext, IUserAccessor userAccessor)
        {
            this.dataContext = dataContext;
            this.userAccessor = userAccessor;
        }

        public async Task CreateMessage(Guid id, MessageCreateRequest values)
        {
            var subchannel = await dataContext.Subchannels.FirstOrDefaultAsync(sc => sc.Id == id);
            if (subchannel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Subchannel not found" });
            }

            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Username == userAccessor.GetCurrentUsername());

            if (!subchannel.Channel.UserChannels.Any(uc => uc.UserId == user.Id))
            {
                throw new RestException(HttpStatusCode.Forbidden, new { details = "User does not belong to the channel" });
            }
    
            dataContext.Messages.Add(new Message
            {
                Id = values.Id,
                Subchannel = subchannel,
                User = user,
                Date = DateTime.Now,
                Content = values.Content
            });

            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }
        }

        public async Task Delete(Guid id)
        {
            var subchannel = await dataContext.Subchannels.FirstOrDefaultAsync(sc => sc.Id == id);
            if (subchannel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Subchannel not found" });
            }

            if(!await dataContext.UserChannels.AnyAsync(uc => uc.ChannelId == subchannel.Channel.Id && userAccessor.GetCurrentUsername() == uc.User.Username && uc.IsCreator))
            {
                throw new RestException(HttpStatusCode.Forbidden, new { details = "User is not the channel creator" });
            }

            dataContext.Remove(subchannel);
            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }
        }
    }
}
