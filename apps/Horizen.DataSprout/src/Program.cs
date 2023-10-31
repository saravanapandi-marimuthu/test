// See https://aka.ms/new-console-template for more information
using Microsoft.Extensions.DependencyInjection;
using Horizen.Data;
using Horizen.Storage;
using Horizen.DataSprout.Services;
using Microsoft.Extensions.Hosting;

Console.WriteLine("Horizen DataSprout Data Seeder Utility!");

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

Console.WriteLine($"Environment: {builder.Environment.EnvironmentName}");

var configuration = builder.Configuration;

builder.Services
    .AddHorizenStorage("StorageConnection")
    .AddHorizenDb(configuration, "DefaultConnection")
    .AddHostedService<DataSeederService>()
    .AddSeedServices();

using IHost host = builder.Build();

await host.RunAsync();
