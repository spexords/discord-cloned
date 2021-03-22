using System;
using System.Collections.Generic;

namespace Application.DTO
{
    public class ChannelDetailedDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CreatorId { get; set; }
        public ICollection<SubchannelDto> Subchannels { get; set; }
    }
}
