using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Subchannel
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public virtual Channel Channel { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
    }
}
