using Microsoft.AspNetCore.Mvc;

namespace dotnet_api.Controllers;

[Route("health")]
public class HealthController : ControllerBase
{
    
    [HttpGet]
    public IActionResult GetHealth()
    {
        return Ok("Healthy");
    }
    
}