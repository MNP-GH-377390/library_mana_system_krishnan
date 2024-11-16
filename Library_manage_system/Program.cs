using Library_manage_system.Data; 
using Microsoft.EntityFrameworkCore;

namespace Library_manage_system
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

           
            builder.Services.AddControllers();

            
            var connectionString = builder.Configuration.GetConnectionString("MyConnection");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("Connection string 'MyConnection' not found.");
            }

           
            builder.Services.AddDbContext<LibraryContext>(options =>
                options.UseSqlServer(connectionString)); 

          
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}