using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class UserChannel
    {
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public Guid ChannelId { get; set; }
        public virtual Channel Channel { get; set; }
        public bool IsCreator { get; set; }
    }
}
