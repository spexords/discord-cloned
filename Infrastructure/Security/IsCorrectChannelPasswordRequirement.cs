using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Routing;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public class IsCorrectChannelPasswordRequirement : IAuthorizationRequirement
    {

    }

    public class IsCorrectChannelPasswordHandler : AuthorizationHandler<IsCorrectChannelPasswordRequirement>
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly DataContext dataContext;

        public IsCorrectChannelPasswordHandler(IHttpContextAccessor httpContextAccessor, DataContext dataContext)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.dataContext = dataContext;
        }
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCorrectChannelPasswordRequirement requirement)
        {
            var hashedPassword = httpContextAccessor.HttpContext.Request.Headers["channel-password"].FirstOrDefault();
            var channelId = Guid.Parse(httpContextAccessor.HttpContext.GetRouteData().Values["id"].ToString());
            var channel = await dataContext.Channels.FindAsync(channelId);
            if (channel?.HashedPassword.ToLower() == hashedPassword.ToLower())
            {
                context.Succeed(requirement);
            }
        }
    }
}
