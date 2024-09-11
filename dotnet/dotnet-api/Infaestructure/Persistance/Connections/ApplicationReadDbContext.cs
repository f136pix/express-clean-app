using System.Data;
using Dapper;
using dotnet_api._Common.Interfaces;
using Npgsql;

namespace dotnet_api.Persistance.Connections;

public class ApplicationReadDbConnection : IApplicationReadDbConnection , IDisposable
{
    private readonly IDbConnection _connection;
    public ApplicationReadDbConnection(IConfiguration configuration)
    {
        _connection = new NpgsqlConnection(configuration.GetConnectionString("DefaultConnection"));
    }
    public async Task<IReadOnlyList<T>> QueryAsync<T>(string sql, object param = null, IDbTransaction transaction = null, CancellationToken cancellationToken = default)
    {
        return (await _connection.QueryAsync<T>(sql, param, transaction)).AsList();
    }
    public async Task<T> QueryFirstOrDefaultAsync<T>(string sql, object param = null, IDbTransaction transaction = null, CancellationToken cancellationToken = default)
    {
        return await _connection.QueryFirstOrDefaultAsync<T>(sql, param, transaction);
    }
    public async Task<T> QuerySingleAsync<T>(string sql, object param = null, IDbTransaction transaction = null, CancellationToken cancellationToken = default)
    {
        return await _connection.QuerySingleAsync<T>(sql, param, transaction);
    }
    public void Dispose()
    {
        _connection.Dispose();
    }
}