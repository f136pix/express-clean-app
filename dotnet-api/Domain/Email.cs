using Domain;

public class Email
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public DateTime SentDate { get; set; }
    public int ClientId { get; set; }
    public virtual Client Client { get; set; }
}