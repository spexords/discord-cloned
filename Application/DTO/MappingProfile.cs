using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.DTO
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(u => u.Token, opt => opt.MapFrom<TokenResolver>());
            CreateMap<User, UserGeneralDto>();
            CreateMap<Channel, ChannelDto>();
            CreateMap<Channel, ChannelDetailedDto>()
                .ForMember(c => c.CreatorId, opt => opt.MapFrom(src => src.UserChannels.First(uc => uc.IsCreator).UserId));
            CreateMap<Subchannel, SubchannelDto>();
            CreateMap<Subchannel, SubchannelDetailedDto>();
            CreateMap<Message, MessageDto>()
                .ForMember(m => m.Sender, opt => opt.MapFrom(src => src.User.Username));
        }
    }
}
