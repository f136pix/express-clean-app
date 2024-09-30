using Application._Common.Exceptions;
using Dapper;
using Domain;
using dotnet_api._Common.Interfaces;
using MediatR;

namespace Application.Clients.Queries.GetClientById;

public class GetClientByIdQueryHandler : IRequestHandler<GetClientByIdQuery, Client>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IDapperConnectionFactory _connectionFactory;

    public GetClientByIdQueryHandler(IApplicationDbContext applicationDbContext, IDapperConnectionFactory factory,
        IDapperConnectionFactory connectionFactory)
    {
        _dbContext = applicationDbContext;
        _connectionFactory = connectionFactory;
    }

    public async Task<Client> Handle(GetClientByIdQuery request, CancellationToken cancellationToken)
    {
        // string query = "Select * From Order o Inner Join Product p On o.Product_Id = p.Product_Id";
        // var orders = connection.Query<Order, Product, Order>(query, map:
        //     (order, product) =>
        //     {
        //         order.Product = product;
        //         return order;
        //     }, splitOn: "Product_Id;


        // @"SELECT c.*, e.* FROM ""Clients"" AS c INNER JOIN ""Emails"" AS e ON c.""Id"" = e.ClientId WHERE c.Id = @Id";

        var query = @"SELECT * FROM ""Clients"" c WHERE c.""Id"" = @Id";
        var client = await _dbContext.Connection.QueryFirstOrDefaultAsync<Client>(query, new { Id = request.Id });
        if (client is null)
        {
            throw new NotFoundException($"Client With ID {request.Id} does not exists");
        }

        return client;
    }
}