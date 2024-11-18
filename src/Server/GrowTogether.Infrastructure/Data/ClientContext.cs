using GrowTogether.Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GrowTogether.Infrastructure.Data;

public class ClientContext : IdentityDbContext<AppUser>
{
    public ClientContext(DbContextOptions<ClientContext> options) : base(options)
    {
    }

    public DbSet<AppUser> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
}
