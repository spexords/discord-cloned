﻿using Application.DTO;
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

            if(await dataContext.Channels.AnyAsync(c => c.Name == values.Name))
            {
                throw new RestException(HttpStatusCode.BadRequest, new { details = "Channel name is already used" });
            }

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

        
        public async Task CreateSubchannel(Guid channelId, SubchannelCreateRequest values)
        {
            var channel = await dataContext.Channels.FirstOrDefaultAsync(c => c.Id == channelId);
            if(channel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Channel not found" });
            }

            dataContext.Subchannels.Add(new Subchannel
            {
                Id = values.Id,
                Name = values.Name,
                Channel = channel
            });

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

        public async Task DeleteSubchannel(Guid channelId, Guid subchannelId)
        {
            var channel = await dataContext.Channels.FirstOrDefaultAsync(c => c.Id == channelId);
            if (channel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Channel not found" });
            }
            var subchannel = channel.Subchannels.FirstOrDefault(sc => sc.Id == subchannelId);
            if (subchannel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Subchannel not found" });
            }
            dataContext.Remove(subchannel);
            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }
        }

        public async Task<ChannelDetailedDto> Details(Guid id)
        {
            var userChannel = await dataContext.UserChannels.FirstOrDefaultAsync(uc => uc.User.Username == userAccessor.GetCurrentUsername() && uc.ChannelId == id);
            if (userChannel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Channel not found or user does not belong to the channel" });
            }

            return mapper.Map<ChannelDetailedDto>(userChannel.Channel);
        }

        public async Task<List<ChannelDto>> GetAll()
        {
            var channels = await dataContext.UserChannels.Where(uc => uc.User.Username == userAccessor.GetCurrentUsername())
                                                         .Select(uc => uc.Channel)
                                                         .ToListAsync();
            return mapper.Map<List<ChannelDto>>(channels);
        }

        public async Task<ChannelDto> Join(ChannelJoinRequest values)
        {
            var channel = await dataContext.Channels.FirstOrDefaultAsync(c => c.Name == values.Name && c.HashedPassword == values.Password.ToSHA256());
            if (channel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Invalid channel name or password" });
            }

            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Username == userAccessor.GetCurrentUsername());
            if(await dataContext.UserChannels.AnyAsync(uc => uc.ChannelId == channel.Id && uc.UserId == user.Id))
            {
                throw new RestException(HttpStatusCode.BadRequest, new { details = "User already belongs to the channel" });
            }

            dataContext.UserChannels.Add(new UserChannel { Channel = channel, User = user });
            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }
            return mapper.Map<ChannelDto>(channel);
        }

        public async Task KickUser(Guid channelId, Guid userId)
        {
            var userChannel = await dataContext.UserChannels.FirstOrDefaultAsync(uc => uc.ChannelId == channelId && uc.UserId == userId );
            if (userChannel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Channel or user not found" });
            }

            dataContext.Remove(userChannel);

            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }
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
                throw new RestException(HttpStatusCode.BadRequest, new { details = "Invalid channel password" });
            }
            channel.HashedPassword = values.NewPassword.ToSHA256();
            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }
        }

        public async Task<List<UserGeneralDto>> GetAllUsers(Guid id)
        {
            if (!await dataContext.UserChannels.AnyAsync(uc => uc.ChannelId == id && uc.User.Username == userAccessor.GetCurrentUsername()))
            {
                throw new RestException(HttpStatusCode.BadRequest, new { details = "User does not belong to the channel" });
            }

            var users = await dataContext.UserChannels.Where(uc => uc.ChannelId == id).Select(uc => uc.User).ToListAsync();
            return mapper.Map<List<UserGeneralDto>>(users);
        }

        public async Task Leave(Guid id)
        {
            var userChannel = await dataContext.UserChannels.FirstOrDefaultAsync(uc => uc.ChannelId == id && uc.User.Username == userAccessor.GetCurrentUsername());
            if(userChannel == null)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { details = "Could not leave channel" });
            }

            UserChannel newCreator = null;
            if(userChannel.IsCreator)
            {
                newCreator = await dataContext.UserChannels.FirstOrDefaultAsync(uc => uc.ChannelId == id && !uc.IsCreator);
                if(newCreator != null)
                {
                    newCreator.IsCreator = true;
                }
                else
                {
                    dataContext.Remove(userChannel.Channel);
                }
            }

            if(newCreator != null)
            {
                dataContext.UserChannels.Remove(userChannel);
            }

            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }
        }
    }
}
