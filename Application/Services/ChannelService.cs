using Application.DTO;
using Application.Errors;
using Application.Forms;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Extensions;
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
    public class ChannelService : IChannelService
    {
        private readonly DataContext dataContext;
        private readonly IUserAccessor userAccessor;
        private readonly IMapper mapper;

        public ChannelService(DataContext dataContext, IUserAccessor userAccessor, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.userAccessor = userAccessor;
            this.mapper = mapper;
        }

        public async Task Create(ChannelCreateRequest values)
        {
            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Username == userAccessor.GetCurrentUsername());
            var channel = new Channel
            {
                Id = values.Id,
                HashedPassword = values.Password.ToSHA256(),
                Name = values.Name
            };

            var userChannel = new UserChannel
            {
                User = user,
                Channel = channel,
                IsCreator = true
            };
            await dataContext.UserChannels.AddAsync(userChannel);
            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }
        }

        public async Task Delete(Guid id)
        {
            var channel = await dataContext.Channels.FirstOrDefaultAsync(c => c.Id == id);
            if(channel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Channel not found" });
            }
            dataContext.Remove(channel);
            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }
        }

        public async Task<ChannelDetailedDto> Details(Guid id)
        {
            var channel = await dataContext.UserChannels.Where(uc => uc.User.Username == userAccessor.GetCurrentUsername())
                                                        .Select(uc => uc.Channel)
                                                        .FirstOrDefaultAsync(c => c.Id == id);
            if (channel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Channel not found" });
            }

            return mapper.Map<ChannelDetailedDto>(channel);
        }

        public async Task<List<ChannelDto>> GetAll()
        {
            var channels = await dataContext.UserChannels.Where(uc => uc.User.Username == userAccessor.GetCurrentUsername())
                                                         .Select(uc => uc.Channel)
                                                         .ToListAsync();
            return mapper.Map<List<ChannelDto>>(channels);
        }

        public async Task UpdateChannelPassword(Guid id, ChangePasswordRequest values)
        {
            var channel = await dataContext.Channels.FirstOrDefaultAsync(c => c.Id == id);

            if (channel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Channel not found" });
            }

            if (channel.HashedPassword != values.CurrentPassword.ToSHA256())
            {
                throw new RestException(HttpStatusCode.BadRequest, new { details = "Invalid password" });
            }
            channel.HashedPassword = values.NewPassword.ToSHA256();
            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }
        }

    }
}
