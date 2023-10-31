using Horizen.Data.Domain.Common.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Horizen.Data.Domain.Common.EntityConfigurations;

public class BaseModelConfiguration<TEntity> : IEntityTypeConfiguration<TEntity>
    where TEntity : BaseEntity
{
    public virtual void Configure(EntityTypeBuilder<TEntity> builder)
    {
        builder.Property(e => e.RowVersion).IsRowVersion();
        builder.HasQueryFilter(t => !t.IsDeleted);
    }
}
