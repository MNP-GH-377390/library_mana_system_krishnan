using System.ComponentModel.DataAnnotations;

namespace Library_manage_system.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public String Name { get; set; }
        public string Description { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}
