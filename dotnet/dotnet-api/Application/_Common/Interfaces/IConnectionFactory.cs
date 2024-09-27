using System.Data;

namespace dotnet_api._Common.Interfaces;

public interface IDapperConnectionFactory
{
    IDbConnection CreateConnection();
}