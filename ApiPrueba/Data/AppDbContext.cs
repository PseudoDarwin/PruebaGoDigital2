using Microsoft.EntityFrameworkCore;
using ApiPrueba.Models;

namespace ApiPrueba.Data;

public class AppDbContext : DbContext
{
    public DbSet<TaskItem> Tasks { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }
}