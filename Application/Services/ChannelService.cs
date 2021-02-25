using Application.DTO;
using Application.Errors;
using Application.Forms;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.Interfaces;
using Extensions;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ChannelService : IChannelService
    {
        private readonly IChannelRepository channelRepository;
        private readonly IUserAccessor userAccessor;
        private readonly IMapper mapper;

        public ChannelService(IChannelRepository channelRepository, IUserAccessor userAccessor, IMapper mapper)
        {
            this.channelRepository = channelRepository;
            this.userAccessor = userAccessor;
            this.mapper = mapper;
        }

        public async Task Create(ChannelCreateRequest values)
        {
            var channel = new Channel
            {
                Id = values.Id,
                HashedPassword = values.Password.ToSHA256(),
                Name = values.Name
            };
            await channelRepository.AddAsync(channel);
        }

        public async Task Delete(Guid id)
        {
            var channel = await channelRepository.FindByIdAndUsernameAsync(id, userAccessor.GetCurrentUsername());
            if(channel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Channel not found" });
            }
            await channelRepository.RemoveAsync(channel);
        }

        public async Task<ChannelDetailedDto> Details(Guid id)
        {
            var channel = await channelRepository.FindByIdAndUsernameAsync(id, userAccessor.GetCurrentUsername());
            if (channel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Channel not found" });
            }
            return mapper.Map<ChannelDetailedDto>(channel);
        }

        public async Task<List<ChannelDto>> GetAll()
        {
            var channels = await channelRepository.GetAllChannelsByUsernameAsync(userAccessor.GetCurrentUsername());
            return mapper.Map<List<ChannelDto>>(channels);
        }

        public async Task UpdateChannelPassword(Guid id, ChangePasswordRequest values)
        {
            var channel = await channelRepository.FindByIdAndUsernameAsync(id, userAccessor.GetCurrentUsername());

            if (channel == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Channel not found" });
            }

            if (channel.HashedPassword != values.CurrentPassword.ToSHA256())
            {
                throw new RestException(HttpStatusCode.BadRequest, new { details = "Invalid password" });
            }
            channel.HashedPassword = values.NewPassword.ToSHA256();
            await channelRepository.UpdateAsync(channel);
        }

    }
}
