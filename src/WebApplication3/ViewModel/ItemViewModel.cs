using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication3.Models;

namespace WebApplication3
{
    public class ItemViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? GroupId { get; set; }
        public int? StateId { get; set; }
        public int? ResourceId { get; set; }

        public string StateName { get; set; }
        public string ResourceName { get; set; }

        public string GroupName { get; set; }

        public Group GroupObject { get; set; }
        public State StateObject { get; set; }

        public Resource ResourceObject { get; set; }
    }
}
