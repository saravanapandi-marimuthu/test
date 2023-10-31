using System.Net;
using Horizen.Data.Domain.UserRoles.Enums;
using Horizen.Data.Domain.Users.Models;
using Horizen.Storage.Queues;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Horizen.WorkflowFunction
{
    public class Test
    {
        private readonly ILogger _logger;
        private readonly UserInviteQueueService _userInviteQueueService;

        public Test(ILogger<Test> logger, UserInviteQueueService userInviteQueueService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _userInviteQueueService =
                userInviteQueueService
                ?? throw new ArgumentNullException(nameof(userInviteQueueService));
        }

        [Function("Test")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req
        )
        {
            var test = Environment.GetEnvironmentVariable("TestConfig");
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var userInviteMessage = new UserInviteMessage
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "kalyanganesan@outlook.com",
                Role = RoleTypes.BasicUser,
                CompanyId = Guid.NewGuid(),
                ExpiresAt = DateTime.UtcNow.AddDays(1),
                Token = Guid.NewGuid().ToString(),
                InvitedByUserId = Guid.NewGuid()
            };

            await _userInviteQueueService.SendMessageAsync(userInviteMessage);
            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString($"Welcome to Azure Functions! {test}");

            return response;
        }
    }
}
