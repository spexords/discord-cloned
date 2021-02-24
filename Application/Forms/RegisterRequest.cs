using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Forms
{
    public class RegisterRequest : LoginRequest
    {
        public string Email { get; set; }
    }
}
