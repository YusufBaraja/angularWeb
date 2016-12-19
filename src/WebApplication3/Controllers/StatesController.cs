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
    [Route("api/States")]
    public class StatesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StatesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/States
        [HttpGet]
        public IEnumerable<State> GetState()
        {
            return _context.State;
        }

        // GET: api/States/5
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

            return Ok(state);
        }

        // PUT: api/States/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutState([FromRoute] int id, [FromBody] State state)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != state.Id)
            {
                return BadRequest();
            }

            _context.Entry(state).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/States
        [HttpPost]
        public async Task<IActionResult> PostState([FromBody] State state)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.State.Add(state);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StateExists(state.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetState", new { id = state.Id }, state);
        }

        // DELETE: api/States/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteState([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            State state = await _context.State.SingleOrDefaultAsync(m => m.Id == id);
            Item item = await _context.Item.SingleOrDefaultAsync(i => i.StateId == id);
            if (state == null || item == null)
            {
                return NotFound();
            }

            _context.State.Remove(state);
            _context.Item.Remove(item);
            await _context.SaveChangesAsync();
            return Ok(state);
        }

        private bool StateExists(int id)
        {
            return _context.State.Any(e => e.Id == id);
        }
    }
}