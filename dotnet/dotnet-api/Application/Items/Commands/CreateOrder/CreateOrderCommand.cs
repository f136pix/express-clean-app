using Domain;
using MediatR;

namespace Application.Items.Commands.CreateOrder;

public record CreateOrderCommand(Order order) : IRequest<Order>
{
    
}