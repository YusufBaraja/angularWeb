using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3
{
    public class GroupViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? StateId { get; set; }
        public int? ResourceId { get; set; }

        public string StateName { get; set; }
        public string ResourceName { get; set;}
    }
}
