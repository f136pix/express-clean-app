namespace Domain;

public class Company
{
    public Guid Id;
    public string Name { get; }

    public Company(string name)
    {
        Id = Guid.NewGuid();
        Name = name;
    }
}