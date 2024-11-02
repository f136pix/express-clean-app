using System.Net;
using System.Net.Mail;
using Application._Common.Dtos;
using Application._Common.Interfaces;

namespace dotnet_api._Common.Services.Email;

public class EmailSender : IEmailSender
{
    private readonly EmailSettings _emailSettings;

    public EmailSender(EmailSettings emailSettings)
    {
        _emailSettings = emailSettings;
    }

    public async Task<bool> SendEmailAsync(SendEmailDto data)
    {
        return await Execute(data);
    }

    private async Task<bool> Execute(SendEmailDto data)
    {
        // var jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(data, Newtonsoft.Json.Formatting.Indented);
        // Console.WriteLine(jsonData);
        // return;

        var fromEmail = _emailSettings.FromAddress;
        var toEmail = data.Email;

        MailMessage mail = new MailMessage
        {
            From = new MailAddress(fromEmail),
            Subject = data.Subject,
            Body = data.Message,
            IsBodyHtml = true,
            Priority = MailPriority.Normal
        };

        mail.To.Add(new MailAddress(toEmail));

        using SmtpClient smtp = new SmtpClient(_emailSettings.ServerAddress, _emailSettings.ServerPort);
        smtp.Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password);
        smtp.EnableSsl = _emailSettings.ServerUseSsl;
        try
        {
            await smtp.SendMailAsync(mail);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return false;
        }

        Console.WriteLine("Email sent successfully!");
        return true;
    }
}