using Application._Common.Exceptions;
using Domain;
using dotnet_api._Common.Interfaces;
using MediatR;

namespace Application.Clients.Queries.GetClientById;

public class GetClientByIdQueryHandler : IRequestHandler<GetClientByIdQuery, Client>
{
    private readonly IApplicationReadDbConnection _readDbCon;

    public GetClientByIdQueryHandler(IApplicationReadDbConnection readDbConnection)
    {
        _readDbCon = readDbConnection;
    }

    public async Task<Client> Handle(GetClientByIdQuery request, CancellationToken cancellationToken)
    {
        var query = @"SELECT * FROM ""Clients"" c WHERE c.""Id"" = @Id";
        var client = await _readDbCon.QueryFirstOrDefaultAsync<Client>(query, new { Id = request.Id });
        if (client is null)
        {
            throw new NotFoundException($"Client With ID {request.Id} does not exists");
        }

        return client;
    }
}