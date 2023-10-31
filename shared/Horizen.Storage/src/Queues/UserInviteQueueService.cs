using Microsoft.Extensions.Logging;

namespace Horizen.Storage.Queues;

public class UserInviteQueueService : BaseQueueService
{
    public UserInviteQueueService(ILogger<UserInviteQueueService> logger, string connectionString)
        : base(logger, connectionString, "invite-users-queue") { }
}
