using Application.Items;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class DependencyInjection
{
    public static IServiceCollection ApplicationServices(this IServiceCollection services)
    {
        RegisterMediatr(services);
        return services;
    }

    public static IServiceCollection RegisterMediatr(this IServiceCollection services)
    {
        services.AddMediatR(options => { options.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly); });

        return services;
    }
}