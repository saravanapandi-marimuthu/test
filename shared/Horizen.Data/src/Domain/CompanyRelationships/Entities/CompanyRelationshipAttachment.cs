using Horizen.Data.Domain.Common.Entities;

namespace Horizen.Data.Domain.CompanyRelationships.Entities;

public class CompanyRelationshipAttachment : BaseEntity
{
    public int Id { get; set; }
    public int CompanyRelationshipId { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public string Path { get; set; } = "";
    public string MimeType { get; set; } = "";
    public string? ThumbnailPath { get; set; }
    public string? ThumbnailMimeType { get; set; }

    public CompanyRelationship CompanyRelationship { get; set; } = null!;
}
