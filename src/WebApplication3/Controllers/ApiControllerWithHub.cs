using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.Controllers
{
    public abstract class ApiControllerWithHub<THub> : Controller
          where THub : IHub
    {
        //Lazy<IHubContext> hub = new Lazy<IHubContext>(
        //    () => GlobalHost.ConnectionManager.GetHubContext<THub>()
        //);

        //protected IHubContext Hub
        //{
        //    get { return hub.Value; }
        //}
    }
}
