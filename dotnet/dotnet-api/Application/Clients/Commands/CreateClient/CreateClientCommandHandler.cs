using System.Data;
using Application._Common.Exceptions;
using Domain;
using MediatR;
using dotnet_api._Common.Interfaces;

namespace Application.Clients.Commands.CreateClient;

public class CreateClientCommandHandler : IRequestHandler<CreateClientCommand, Client>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IDapperConnectionFactory _connectionFactory;

    public CreateClientCommandHandler(IApplicationDbContext applicationDbContext, IDapperConnectionFactory factory, IDapperConnectionFactory connectionFactory)
    {
        _dbContext = applicationDbContext;
        _connectionFactory = connectionFactory;
    }

    public async Task<Client> Handle(CreateClientCommand request, CancellationToken cancellationToken)
    {
        _dbContext.Connection.Open();
        using var transaction = _dbContext.Connection.BeginTransaction();
        using var connection = _connectionFactory.CreateConnection();
        try
        {
            var sql = @"SELECT * FROM ""Clients"" WHERE ""Name"" = @Name";
            var client = await connection.
            
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