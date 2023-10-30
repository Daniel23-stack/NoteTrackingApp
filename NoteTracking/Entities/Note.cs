using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NoteTracking.Entities;

public class Note
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }

    public string Content { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}

