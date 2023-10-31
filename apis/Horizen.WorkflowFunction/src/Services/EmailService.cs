using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Horizen.Workflow.Services;

public class EmailService
{
    private readonly ILogger<EmailService> _logger;
    private readonly string _sendgridApiKey;
    private readonly SendGridClient _client;

    public EmailService(ILogger<EmailService> logger, string sendgridApiKey)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _sendgridApiKey = sendgridApiKey ?? throw new ArgumentNullException(nameof(sendgridApiKey));

        var apiKey = Environment.GetEnvironmentVariable(_sendgridApiKey);
        _client = new SendGridClient(apiKey);
    }

    public async Task SendEmailUsingTemplateAsync(
        string recipientEmail,
        string recipientName,
        string templateId,
        object templateData
    )
    {
        var from = new EmailAddress("support@horizen.ag", "Horizen Ag, Inc.");
        //var subject = ""; // You can set this, but if your template has a subject, it will override this value.
        var to = new EmailAddress(recipientEmail, recipientName);

        var msg = MailHelper.CreateSingleTemplateEmail(from, to, templateId, templateData);

        var response = await _client.SendEmailAsync(msg);

        // Optionally, check the response status
        if (response.StatusCode != System.Net.HttpStatusCode.Accepted)
        {
            // Handle the error or log it
            _logger.LogError(
                $"Error sending email to {recipientEmail}. Status code: {response.StatusCode}"
            );
        }
    }
}
