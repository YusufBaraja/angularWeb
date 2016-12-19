using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Data;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Produces("application/json")]
    [Route("api/StatesId")]
    public class StatesIdController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StatesIdController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/StatesId
        [HttpGet]
        public IEnumerable<State> GetState()
        {
            return _context.State;
        }

        // GET: api/StatesId/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetState([FromRoute] int id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            State state = await _context.State.SingleOrDefaultAsync(m => m.Id == id);

            var result = from s in _context.State
                         where s.Id == id
                         select new
                         {
                             name = s.Name,
                             isNewHidden = s.IsNewHidden
                         };

            if (state == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // PUT: api/StatesId/5

       // delete item by stateId

        private bool StateExists(int id)
        {
            return _context.State.Any(e => e.Id == id);
        }
    }
}