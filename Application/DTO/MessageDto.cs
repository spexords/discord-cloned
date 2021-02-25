using System;

namespace Application.DTO
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
        public string Sender { get; set; }
    }
}
