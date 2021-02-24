using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public class IsChannelCreatorRequirement : IAuthorizationRequirement
    {

    }

    public class IsChannelCreatorHandler : AuthorizationHandler<IsChannelCreatorRequirement>
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IActionContextAccessor actionContextAccessor;
        private readonly DataContext dataContext;

        public IsChannelCreatorHandler(IHttpContextAccessor httpContextAccessor, IActionContextAccessor actionContextAccessor, DataContext dataContext)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.actionContextAccessor = actionContextAccessor;
            this.dataContext = dataContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsChannelCreatorRequirement requirement)
        {
            var currentUsername = httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var channelId = Guid.Parse(actionContextAccessor.ActionContext.RouteData.Values["id"].ToString());
            var channel = dataContext.Channels.Find(channelId);
            var creator = channel.UserChannels.FirstOrDefault(uc => uc.IsCreator);
            if (creator?.User.Username == currentUsername)
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
