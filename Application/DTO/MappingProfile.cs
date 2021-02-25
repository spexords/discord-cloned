using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTO
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(u => u.Token, opt => opt.MapFrom<TokenResolver>());

            CreateMap<Channel, ChannelDto>();
            CreateMap<Channel, ChannelDetailedDto>();
            CreateMap<Subchannel, SubchannelDto>();
            CreateMap<Message, MessageDto>()
                .ForMember(m => m.Sender, opt => opt.MapFrom(src => src.User.Username));
        }
    }
}
