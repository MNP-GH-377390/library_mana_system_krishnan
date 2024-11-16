using System.ComponentModel.DataAnnotations;

namespace Library_manage_system.Models
{
    public class Book
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public int Publicationyear { get; set; }
        public int AuthorId { get; set; }
        public  Author Author { get; set; }
        public int CategoryId { get; set;}
        public Category Category { get; set; }

    }
}
