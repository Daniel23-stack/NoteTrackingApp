// Controllers/NotesController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NoteTracking.Data;
using NoteTracking.Entities;

[Route("api/Notes")]
[ApiController]
public class NotesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public NotesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
    {
        return await _context.Notes.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Note>> GetNote(int id)
    {
        var note = await _context.Notes.FindAsync(id);

        if (note == null)
        {
            return NotFound();
        }

        return note;
    }

    [HttpPost]
    public IActionResult CreateNote([FromBody] NoteDto noteDto)
    {
        if (noteDto == null)
        {
            return BadRequest("Note data is missing or invalid.");
        }

        // Map the NoteDto to your Note entity
        var note = new Note
        {
            Title = noteDto.Title,
            Content = noteDto.Content
        };

        try
        {
            _context.Notes.Add(note);
            _context.SaveChanges();
            return Ok("Note created successfully");
        }
        catch (Exception ex)
        {
            return BadRequest($"Error creating the note: {ex.Message}");
        }
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> PutNote(int id, Note note)
    {
        if (id != note.Id)
        {
            return BadRequest();
        }

        note.UpdatedAt = DateTime.Now;
        _context.Entry(note).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!NoteExists(id))
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(int id)
    {
        var note = await _context.Notes.FindAsync(id);
        if (note == null)
        {
            return NotFound();
        }

        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool NoteExists(int id)
    {
        return _context.Notes.Any(e => e.Id == id);
    }
}
