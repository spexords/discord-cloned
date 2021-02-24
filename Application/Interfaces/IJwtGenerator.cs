﻿using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
        string CreateToken(User user);
    }
}
