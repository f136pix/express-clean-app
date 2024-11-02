using System.Data;
using Application._Common.Exceptions;
using Domain;
using MediatR;
using dotnet_api._Common.Interfaces;
using Dapper;

namespace Application.Clients.Commands.CreateClient;

public class CreateClientCommandHandler : IRequestHandler<CreateClientCommand, Client>
{
    private readonly IApplicationDbContext _dbContext;

    public CreateClientCommandHandler(IApplicationDbContext applicationDbContext)
    {
        _dbContext = applicationDbContext;
    }

    public async Task<Client> Handle(CreateClientCommand request, CancellationToken cancellationToken)
    {
        _dbContext.Connection.Open();
        using var transaction = _dbContext.Connection.BeginTransaction();
        try
        {
            var sql = @"SELECT * FROM ""Clients"" WHERE ""Name"" = @Name";
            var client = await _dbContext.Connection.QueryAsync<Client>(sql, new { Name = request.Name });

            if (client is not null)
            {
                throw new AlreadyExistsException($"Client with name {request.Name} already exists");
            }

            Client newClient = new Client(request.Name, request.Email, request.Password, request.Address);
            var ret = await _dbContext.Clients.AddAsync(newClient);

            await _dbContext.SaveChangesAsync(cancellationToken);
            transaction.Commit();

            return ret.Entity;
        }
        catch (Exception e)
        {
            transaction.Rollback();
            throw;
        }
        finally
        {
            _dbContext.Connection.Close();
        }
    }
}