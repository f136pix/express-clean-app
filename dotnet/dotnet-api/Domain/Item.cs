namespace Domain;

public class Item
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int QuantityInStock { get; set; }
    public int BrandId { get; set; }
    public Brand Brand { get; set; } 
    public int CompanyId { get; set; }
    public Company Company { get; set; } 
}