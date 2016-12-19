using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.Hubs
{
    public class MyHub : Hub
    {
        
        public void AddItem(dynamic item)
        {
            Clients.All.addNewItem(item);
        }
    }
}
