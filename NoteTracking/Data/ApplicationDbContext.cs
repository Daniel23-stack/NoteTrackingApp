using Microsoft.EntityFrameworkCore;
using NoteTracking.Entities;

namespace NoteTracking.Data;

public class ApplicationDbContext:DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Note> Notes{ get; set; }
}