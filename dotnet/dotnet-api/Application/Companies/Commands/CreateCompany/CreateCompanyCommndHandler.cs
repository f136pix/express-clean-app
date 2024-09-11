using Application._Common.Exceptions;
using Domain;
using dotnet_api._Common.Interfaces;
using MediatR;

namespace Application.Companies.Commands.CreateCompany;

public class CreateCompanyCommndHandler : IRequestHandler<CreateCompanyCommand, Company>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IApplicationReadDbConnection _readDb;


    public CreateCompanyCommndHandler(IApplicationDbContext dbContext, IApplicationReadDbConnection readDb)
    {
        _dbContext = dbContext;
        _readDb = readDb;
    }

    public async Task<Company> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
    {
        _dbContext.Connection.Open();
        using var transaction = _dbContext.Connection.BeginTransaction();
        try
        {
            var sql = @"SELECT * FROM ""Companies"" WHERE ""Name"" = @Name";
            var company = await _readDb.QueryFirstOrDefaultAsync<Client>(sql, new { Name = request.Name },
                transaction: transaction, cancellationToken: cancellationToken);

            if (company is not null)
            {
                throw new AlreadyExistsException($"Company with name {request.Name} already exists");
            }

            Company newCompany = new Company(request.Name);
            var ret = await _dbContext.Companies.AddAsync(newCompany);

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