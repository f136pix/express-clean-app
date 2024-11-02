namespace Application._Common.Dtos;

public abstract record SendEmailDto(string Email, string Subject, string Message);