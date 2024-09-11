using System.Data;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace dotnet_api._Common.Interfaces;

public interface IApplicationDbContext
{
    public IDbConnection Connection { get; }
    DatabaseFacade Database { get; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<Company> Companies { get; set; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}