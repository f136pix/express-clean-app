using System.Data;
using dotnet_api._Common.Interfaces;
using Npgsql;

namespace dotnet_api.Persistance.Connections;


public class DapperConnectionFactory : IDapperConnectionFactory
{
    private readonly string _connectionString;

    public DapperConnectionFactory(IConfiguration configuration)
    {
        _connectionString = configuration.GetSection("ConnectionStrings")["DefaultConnection"];

        if (string.IsNullOrEmpty(_connectionString))
        {
            throw new InvalidOperationException("Connection string is not configured.");
        }
    }

    public IDbConnection CreateConnection()
    {
        var connection = new NpgsqlConnection(_connectionString);

        connection.Open();

        return connection;
    }
}