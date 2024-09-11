using dotnet_api._Common.Interfaces;
using dotnet_api._Common.Middleware;
using dotnet_api.Persistance.Connections;
using dotnet_api.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace dotnet_api;

public static class DependencyInjection
{
    public static IServiceCollection InfraestructureServices(this IServiceCollection services)
    {
        InjectDataAcess(services);
        return services;
    }

    public static IApplicationBuilder InfraestrureApp(this IApplicationBuilder app)
    {
        app.UseMiddleware<GlobalExceptionHandlingMiddleware>();
        return app;
    }
    
    public static IServiceCollection InjectDataAcess(this IServiceCollection services)
    {
        var serviceProvider = services.BuildServiceProvider();
        var configuration = serviceProvider.GetRequiredService<IConfiguration>();
        
        services.AddDbContext<ApplicationDbContext>(options =>
            options
                .UseNpgsql(configuration.GetConnectionString("DefaultConnection")!)
        );
        services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());
        services.AddScoped<IApplicationWriteDbConnection, ApplicationWriteDbConnection>();
        services.AddScoped<IApplicationReadDbConnection, ApplicationReadDbConnection>();
        services.AddControllers();

        return services;
    }
}