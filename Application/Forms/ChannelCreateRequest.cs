﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Forms
{
    public class ChannelCreateRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
