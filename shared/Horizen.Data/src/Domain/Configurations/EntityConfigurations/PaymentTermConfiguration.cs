using Horizen.Data.Domain.Common.EntityConfigurations;
using Horizen.Data.Domain.Configurations.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Configurations.EntityConfigurations;

public class PaymentTermConfiguration : BaseModelConfiguration<PaymentTerm>
{
    public override void Configure(EntityTypeBuilder<PaymentTerm> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);
        builder.Property(e => e.TermName).IsRequired();
    }
}
