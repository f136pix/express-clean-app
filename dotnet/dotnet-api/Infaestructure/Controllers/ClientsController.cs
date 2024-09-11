using Application.Clients.Commands.CreateClient;
using Application.Clients.Queries.GetClientById;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_api.Controllers;

[Route("client")]
public class ClientController : ControllerBase
{
    private readonly ISender _mediator;

    public ClientController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateClient([FromBody]CreateClientCommand command)
    {
        Client createdClient = await _mediator.Send(command);
        return Ok(createdClient);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetClient(Guid id)
    {
        var client = await _mediator.Send(new GetClientByIdQuery(id));
        if (client == null)
        {
            return NotFound();
        }
        
        return Ok(client);
    }
}