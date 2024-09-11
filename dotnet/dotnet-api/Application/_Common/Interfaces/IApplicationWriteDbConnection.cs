using System.Data;

namespace dotnet_api._Common.Interfaces;

public interface IApplicationWriteDbConnection : IApplicationReadDbConnection
{
    Task<int> ExecuteAsync(string sql, object param = null, IDbTransaction transaction = null, CancellationToken cancellationToken = default);
}