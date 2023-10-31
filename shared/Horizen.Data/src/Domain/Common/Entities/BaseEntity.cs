using System.ComponentModel.DataAnnotations;
using Horizen.Core.Attributes;

namespace Horizen.Data.Domain.Common.Entities;

public abstract class BaseEntity
{
    [SkipInGraphQL]
    public bool IsDeleted { get; set; }
    public string CreatedBy { get; set; } = "";
    public string? UpdatedBy { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    [SkipInGraphQL]
    [Timestamp]
    public uint RowVersion { get; set; }
}
