using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Channel
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string HashedPassword { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<UserChannel> UserChannels { get; set; }
    }
}
