﻿using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface IUserAccessor
    {
        string GetCurrentUsername();
        string GetCurrentChannelPassword();
    }
}
