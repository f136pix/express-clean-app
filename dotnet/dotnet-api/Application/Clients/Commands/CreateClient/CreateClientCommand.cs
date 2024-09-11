using Domain;
using MediatR;

namespace Application.Clients.Commands.CreateClient;

public class CreateClientCommand : IRequest<Client>
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Address { get; set; }
}
