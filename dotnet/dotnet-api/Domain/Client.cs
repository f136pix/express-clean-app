namespace Domain;

public class Client
{
    public Guid Id { get; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Address { get; set; }

    public Client(string name, string email, string password, string address)
    {
        Id = Guid.NewGuid();
        Name = name;
        Email = email;
        Password = password;
        Address = address;
    }

    public Client()
    {
    }
}