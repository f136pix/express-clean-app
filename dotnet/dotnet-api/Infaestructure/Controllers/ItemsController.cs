using Application.Items;
using Contracts.Items;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_api.Controllers;

[Route("/api/items")]
public class ItemsController : ControllerBase
{
    
    public ItemsController()
    {
    }
    
    // [HttpPost]
    // public async Task<IActionResult> CreateItem(
    //     CreateItemRequest request
    // )
    // {
    // }
    
}