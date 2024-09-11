namespace Domain;

public class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalPrice { get; set; }
    public int ClientId { get; set; }
    public Client Client { get; set; }  
    public ICollection<Item> Items { get; set; }
}