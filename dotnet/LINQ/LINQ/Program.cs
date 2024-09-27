IEnumerable<int> collection = new[]
{
    1, 2, 3, 4, 5, 6
};

// Filter 
collection.Where(x => x > 2).Dump("Where");

// Cast
collection.Cast<object>().Dump("Cast");

// Chunks
// Divide array in two arr of length 3
collection.Chunk(3).Dump("Chunk");

// Skips first 3
collection.Skip(3).Dump("Skip");

// Gets frist 3
collection.Take(3).Dump("Take");

// Is going to be lighter than a where through whole array  
// Skip until predicate is true
collection.SkipWhile(x => x < 3).Dump("SkipWhile");

IEnumerable<string> enumerable = collection.Select((x, i) => $"{i} . {x}").Dump("Select");
List<string> list = collection.Select((x, i) => $"{i} . {x}").Dump("Select").ToList();


IEnumerable<object> collection2 = new List<object>()
{
    1,
    "Teste",
    2,
    "Object"
};

// IEnumerable<int> - Gets only int on list
collection2.OfType<int>().Dump("OfType");
// IEnumerable<string> - Gets only strings on list
collection2.OfType<string>().Dump("OfType");

IEnumerable<List<int>> doubleCollection = new []{new List<int> { 1, 2, 4, 5 }, new List<int> { 1, 2, 3, 4 }};

// Joins // flatten the colection
doubleCollection.SelectMany(x => x).Dump("SelectMany");
