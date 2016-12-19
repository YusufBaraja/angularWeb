using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? StateId { get; set; }
        public int? ResourceId { get; set; }
    }
}
