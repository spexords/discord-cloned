using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<UserChannel> UserChannels { get; set; }

    }
}
