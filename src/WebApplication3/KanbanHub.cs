using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace WebApplication3
{
    public class KanbanHub : Hub
    {
        public void Send()
        {            
          Clients.All.broadcastMessage();           
        }

        public void DeleteItem(int itemID)
        {
            Clients.All.refreshDelete(itemID);
           
        }


        public void AddItem(dynamic item)
        {
            Clients.All.addNewItem(item);
        }

        public void AddState(dynamic state)
        {
            Clients.All.addState(state);
        }

        public void AddItemDetail(dynamic itemdetail)
        {
            Clients.All.refreshItemDetail(itemdetail);
        }

        public void UpdateState(object state)
        {
            Clients.All.refreshUpdateState(state);
        }
    }

}


