using System.Collections;
using Horizen.Storage;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices(services =>
    {
        services.AddHorizenStorage("StorageConnection");
    })
    .Build();

foreach (DictionaryEntry envVar in Environment.GetEnvironmentVariables())
{
    Console.WriteLine($"{envVar.Key}: {envVar.Value}");
}

host.Run();
