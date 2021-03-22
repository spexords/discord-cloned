using Application.Errors;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class MessageService : IMessageService
    {
        private readonly DataContext dataContext;
        private readonly IUserAccessor userAccessor;

        public MessageService(DataContext dataContext, IUserAccessor userAccessor)
        {
            this.dataContext = dataContext;
            this.userAccessor = userAccessor;
        }

        public async Task Delete(Guid id)
        {
            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Username == userAccessor.GetCurrentUsername());
            var message = await dataContext.Messages.FirstOrDefaultAsync(m => m.Id == id);
            if(message == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Could not find message" });
            }

            if(message.User.Id != user.Id)
            {
                var userChannel = await dataContext.UserChannels.FirstOrDefaultAsync(uc => uc.ChannelId == message.Subchannel.Channel.Id && uc.IsCreator);
                if (userChannel.User.Id != user.Id)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { details = "Could not delete message" });
                }
            }
            dataContext.Remove(message);
            var success = await dataContext.SaveChangesAsync() > 0;
            if(!success)
            {
                throw new Exception("Error during saving changes");
            }
        }
    }
}
