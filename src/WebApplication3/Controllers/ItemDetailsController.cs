using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication3.Data;
using WebApplication3.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication3.Controllers
{
    [Produces("application/json")]
    [Route("api/ItemDetails")]
    public class ItemDetailsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ItemDetailsController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IQueryable<ItemDetail> GetItemDetail()
        {

            var result = (from id in _context.ItemDetail
                          join i in _context.Item on id.ItemId equals i.Id
                          select new ItemDetail
                          {
                              Id = id.Id,
                              ItemId = id.ItemId,
                              Description = id.Description
                          });

            return result;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // ItemDetail itemDetail = await _context.ItemDetail.SingleOrDefaultAsync(m => m.ItemId == id);
             var result =   (from ids in _context.ItemDetail                         
                          join i in _context.Item
                          on ids.ItemId equals i.Id
                          where ids.ItemId == id
                          select new ItemDetail
                          {
                              Id = ids.Id,
                              ItemId = ids.ItemId,
                              Description = ids.Description
                          });

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }


        //POST: 
        [HttpPost]
        public async Task<IActionResult> PostItemDetail([FromBody] ItemDetail itemDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ItemDetail.Add(itemDetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ItemDetailExist(itemDetail.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetItemDetail", new { id = itemDetail.Id }, itemDetail);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ItemDetail itemdetail = await _context.ItemDetail.SingleOrDefaultAsync(m => m.Id == id);
            if (itemdetail == null)
            {
                return NotFound();
            }

            _context.ItemDetail.Remove(itemdetail);
            await _context.SaveChangesAsync();

            return Ok(itemdetail);
        }

        private bool ItemDetailExist(int id)
        {
            return _context.ItemDetail.Any(e => e.Id == id);
        }

    }
}
