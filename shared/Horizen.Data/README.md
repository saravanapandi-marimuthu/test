
# Database Migration

__WARNING:__ _Before you migrate, make sure you test your schema changes thoroughly in dev environment:_

## Update Database with the latest migration

Navigate to Horizen.Data project folder in VS Code integrated terminal.

```bash
dotnet ef database update --startup-project ../../apps/Horizen.DataSprout
```

## Drop the database (__Don't do this on production database__)

If you are working with a local DB, you'll need to clear data before you update with the latest migration.

Navigate to Horizen.Data project folder in VS Code integrated terminal.

```bash
dotnet ef database drop --startup-project ../../apps/Horizen.DataSprout
```

## Create Initial Migration

Navigate to Horizen.Data project folder in VS Code integrated terminal.

```bash
dotnet ef migrations add InitialCreate --startup-project ../../apps/Horizen.DataSprout
```

## Undo the last Migration

Navigate to Horizen.Data project folder in VS Code integrated terminal.

```bash
dotnet ef migrations remove --startup-project ../../apps/Horizen.DataSprout
```

Ignore a field from being added to database

```csharp
[NotMapped]
public bool IsActive => DateTime.Now >= StartDate && DateTime.Now <= EndDate;
```

Ignore a field from being added to GraphQL output

```csharp
[GraphQLIgnore]
public byte[] RowVersion {get; set;}
```

Specifying a different class name for GraphQL

```csharp
using HotChocolate;

[GraphQLName("UserCreateRequest")]
public class UserCreateRequestDTO
{
    // ... properties and methods ...
}
```

GraphQL Error

```csharp
throw new GraphQLException(
    ErrorBuilder
    .New()
    .SetMessage("User not signed in!")
    .SetCode ("ABC" )
    .SetExtension("Foo", "Bar'"
    .Build());
```

## Adding to Redis Cache

```csharp
    _redisDb.StringSet(
        $"Tag:{existingTagCategory.Id}",
        JsonSerializer.Serialize(existingTagCategory),
        TimeSpan.FromMinutes(1)
    );
```
