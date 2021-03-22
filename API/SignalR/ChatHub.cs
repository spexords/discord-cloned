using Application.Forms;
using Application.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IUserAccessor userAccessor;
        private readonly IMessageService messageService;
        private readonly ISubchannelService subchannelService;

        public ChatHub(IUserAccessor userAccessor, IMessageService messageService, ISubchannelService subchannelService)
        {
            this.userAccessor = userAccessor;
            this.messageService = messageService;
            this.subchannelService = subchannelService;
        }

        public async Task SendMessage(Guid id, MessageCreateRequest values)
        {
            var message = await subchannelService.CreateMessage(id, values);
            await Clients.Group(id.ToString()).SendAsync("ReceiveMessage", message);
        }

        public async Task RemoveMessage(Guid gid, Guid mid)
        {
            await messageService.Delete(mid);
            await Clients.Group(gid.ToString()).SendAsync("ReceiveRemoveMessage", mid);
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            var username = userAccessor.GetCurrentUsername();
            await Clients.OthersInGroup(groupName).SendAsync("Send", $"{username} has joined the group");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            var username = userAccessor.GetCurrentUsername();
            await Clients.OthersInGroup(groupName).SendAsync("Send", $"{username} has left the group");
        }

    }
}
