using Domain;
using MediatR;

namespace Application.Companies.Commands.CreateCompany;

public record CreateCompanyCommand(string Name): IRequest<Company>
{
    
}