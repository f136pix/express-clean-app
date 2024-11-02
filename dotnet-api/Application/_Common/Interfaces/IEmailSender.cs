using Application._Common.Dtos;

namespace Application._Common.Interfaces;

public interface IEmailSender
{
    Task<bool> SendEmailAsync(SendEmailDto dto);
}