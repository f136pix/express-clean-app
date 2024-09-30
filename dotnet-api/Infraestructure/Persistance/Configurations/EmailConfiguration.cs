using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace dotnet_api.Persistance.Configurations;

public class EmailConfiguration : IEntityTypeConfiguration<Email>
{
    public void Configure(EntityTypeBuilder<Email> builder)
    {
        builder.ToTable("Emails");

        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id)
            .ValueGeneratedNever();
        
        builder.Property(e => e.Subject);

        builder.Property(e => e.Body);

        builder.Property(e => e.SentDate);
  
        builder.HasOne(e => e.Client)      
            .WithMany(c => c.Emails)    
            .HasForeignKey(e => e.ClientId); 

        builder.Property(e => e.Subject)
            .IsRequired();
    }
}