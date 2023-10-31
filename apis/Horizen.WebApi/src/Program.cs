using Horizen.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using HotChocolate.Types.Descriptors;
using HotChocolate.AspNetCore;
using Horizen.WebApi.GraphQL.Extensions;
using Horizen.WebApi.GraphQL.Middleware;
using Horizen.WebApi.GraphQL.Auth;
using Horizen.Data.Domain.Auth.Services;

var builder = WebApplication.CreateBuilder(args);

Console.WriteLine($"Environment: {builder.Environment.EnvironmentName}");

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }
    );
});

var config = builder.Configuration.GetSection("AzureAdB2C");

config.GetChildren().ToList().ForEach(x => Console.WriteLine($"{x.Key}: {x.Value}"));

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(
        builder.Configuration.GetSection("AzureAdB2C"),
        subscribeToJwtBearerMiddlewareDiagnosticsEvents: true
    )
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("customer.access", policy => policy.RequireClaim("scp", "customer.access"));
});

builder.Services.AddHorizenDb(builder.Configuration, "DefaultConnection");

builder.Services.AddSingleton<ITypeInspector, CustomTypeInspector>();
builder.Services.AddSingleton<IAuthenticatedUserService, AuthenticatedUserService>();

builder.Services
    .AddGraphQLServer()
    .AllowIntrospection(builder.Environment.IsDevelopment())
    .AddHttpRequestInterceptor<AuthHttpRequestInterceptor>()
    .AddQueryType(q => q.Name("Query"))
    .AddQueries()
    .AddMutationType(e => e.Name("Mutation"))
    .AddMutations()
    .AddMutationConventions()
    .BindRuntimeType<uint, IntType>()
    .UseDefaultPipeline();

var app = builder.Build();

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "Status OK!");
app.MapGraphQL()
    .WithOptions(new GraphQLServerOptions { Tool = { Enable = app.Environment.IsDevelopment() } });

// Log the args to the console
args.ToList().ForEach(x => Console.WriteLine(x));

if (args.Any(x => x.Contains("schema")))
{
    Console.WriteLine("Generating GraphQL Schema...");

    await app.RunWithGraphQLCommandsAsync(args);
    return;
}

Console.WriteLine("Starting GraphQL server...");

app.Run();
