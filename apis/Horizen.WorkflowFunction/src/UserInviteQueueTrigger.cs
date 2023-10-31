using Horizen.Data.Domain.Users.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Horizen.WorkflowFunction
{
    public class UserInviteQueueTrigger
    {
        private const string QueueName = "invite-users-queue";
        private const string ConnectionString = "ConnectionStrings:StorageConnection";
        private const string EmailTemplate = "d-db13965145c84e5599b00a9f30712c50";

        private readonly ILogger<UserInviteQueueTrigger> _logger;

        public UserInviteQueueTrigger(ILogger<UserInviteQueueTrigger> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [Function(nameof(UserInviteQueueTrigger))]
        public void Run(
            [QueueTrigger(QueueName, Connection = ConnectionString)] UserInviteMessage myQueueItem
        )
        {
            try
            {
                _logger.LogInformation(
                    $"C# Queue trigger function processed: {myQueueItem.FirstName}"
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing queue message.");
            }
        }
    }
}
