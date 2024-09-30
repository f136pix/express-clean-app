using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace dotnet_api.Persistance.Configurations;

public class ClientConfiguration : IEntityTypeConfiguration<Client>
{
    public void Configure(EntityTypeBuilder<Client> builder)
    {
        builder.ToTable("Clients");

        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id)
            .ValueGeneratedNever();

        builder.Property(c => c.Name)
            .HasMaxLength(100);

        builder.Property(c => c.Address)
            .HasMaxLength(100);

        builder.Property(c => c.Password);

        builder.HasMany(c => c.Emails)
            .WithOne(e => e.Client)
            .HasForeignKey(e => e.ClientId);
    }
}