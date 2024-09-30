using Domain;
using MediatR;

namespace Application.Clients.Queries.GetClientById;

public record GetClientByIdQuery(Guid Id) : IRequest<Client>;