using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor httpContextAcessor;

        public UserAccessor(IHttpContextAccessor httpContextAcessor)
        {
            this.httpContextAcessor = httpContextAcessor;
        }

        public string GetCurrentUsername()
        {
            var username = httpContextAcessor.HttpContext.User?.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            return username;
        }
        public string GetCurrentChannelPassword()
        {
            var hashedPassword = httpContextAcessor.HttpContext.Request.Headers["channel-password"].FirstOrDefault();
            return hashedPassword.ToUpper();
        }
    }
}
