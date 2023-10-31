using System.ComponentModel.DataAnnotations.Schema;
using Horizen.Core.Attributes;
using Horizen.Data.Domain.Accounts.Enums;
using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.Accounts.Entities;

public class BillingAccount : BaseEntity
{
    public int Id { get; set; }
    public Guid CompanyId { get; set; }
    public string AccountName { get; set; } = "";
    public string? AccountNumber { get; set; }
    public AccountClassification AccountClassification { get; set; }
    public AccountType AccountType { get; set; }

    [SkipInGraphQL]
    public int? AccountSubType { get; set; }
    public BillingAccountStatus AccountStatus { get; set; }
    public string? ExternalAccountId { get; set; }
    public string? ExternalAccountName { get; set; }
    public string? ExternalSubAccountName { get; set; }

    public int? ParentAccountId { get; set; }

    [NotMapped]
    public Bank? Bank
    {
        get => GetAccountSubType<Bank>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public OtherCurrentAsset? OtherCurrentAsset
    {
        get => GetAccountSubType<OtherCurrentAsset>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public FixedAsset? FixedAsset
    {
        get => GetAccountSubType<FixedAsset>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public OtherAsset? OtherAsset
    {
        get => GetAccountSubType<OtherAsset>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public AccountsReceivable? AccountsReceivable
    {
        get => GetAccountSubType<AccountsReceivable>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public Equity? Equity
    {
        get => GetAccountSubType<Equity>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public Expense? Expense
    {
        get => GetAccountSubType<Expense>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public OtherExpense? OtherExpense
    {
        get => GetAccountSubType<OtherExpense>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public CostOfGoodsSold? CostOfGoodsSold
    {
        get => GetAccountSubType<CostOfGoodsSold>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public AccountsPayable? AccountsPayable
    {
        get => GetAccountSubType<AccountsPayable>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public CreditCard? CreditCard
    {
        get => GetAccountSubType<CreditCard>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public LongTermLiability? LongTermLiability
    {
        get => GetAccountSubType<LongTermLiability>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public OtherCurrentLiability? OtherCurrentLiability
    {
        get => GetAccountSubType<OtherCurrentLiability>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public Income? Income
    {
        get => GetAccountSubType<Income>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    [NotMapped]
    public OtherIncome? OtherIncome
    {
        get => GetAccountSubType<OtherIncome>(AccountType.Bank);
        set => SetAccountSubType(value, AccountType.Bank);
    }

    public BillingAccountExtendedProperties ExtendedProperties { get; set; } =
        new BillingAccountExtendedProperties();
    public ICollection<TransactionJournalEntry> JournalEntries { get; set; } =
        new List<TransactionJournalEntry>();

    private void SetAccountSubType<T>(T? value, AccountType accountType)
        where T : struct, Enum
    {
        if (AccountType == accountType && value != null)
        {
            AccountSubType = (int)(object)value;
            return;
        }

        AccountSubType = null;
    }

    private T? GetAccountSubType<T>(AccountType accountType)
        where T : struct, Enum
    {
        if (AccountType == accountType && AccountSubType != null)
        {
            return (T)(object)AccountSubType;
        }

        return null;
    }
}

public class BillingAccountExtendedProperties
{
    public string? Version { get; set; }
}
