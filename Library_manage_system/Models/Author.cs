using System.ComponentModel.DataAnnotations;

namespace Library_manage_system.Models
{
    public class Author
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string bio { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}
