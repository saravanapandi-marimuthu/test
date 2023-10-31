using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Accounts.Entities;

public class TransactionJournalEntry : BaseEntity
{
    public int Id { get; set; }
    public int BillingAccountId { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; } = "";
    public decimal? Debit { get; set; }
    public decimal? Credit { get; set; }
    public string? Memo { get; set; }

    public BillingAccount BillingAccount { get; set; } = null!;
}
