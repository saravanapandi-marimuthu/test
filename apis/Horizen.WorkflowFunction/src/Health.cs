using System.Net;
using Horizen.Data.Domain.UserRoles.Enums;
using Horizen.Data.Domain.Users.Models;
using Horizen.Storage.Queues;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Horizen.WorkflowFunction
{
    public class Health
    {
        private readonly ILogger _logger;

        public Health(ILogger<Health> logger, UserInviteQueueService userInviteQueueService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [Function("Health")]
        public HttpResponseData Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req
        )
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString($"Health check passed! {DateTime.UtcNow}");

            return response;
        }
    }
}
