using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class Message
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
        public virtual User User { get; set; }
        public virtual Channel Channel { get; set; }
    }
}
