using System;
using System.Collections.Generic;

namespace Application.DTO
{
    public class SubchannelDetailedDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<MessageDto> Messages { get; set; }
    }
}
