using System.Text.Json;
using Horizen.Data.Services.Inputs;

namespace Horizen.Data.Services.EnterpriseItems.Inputs;

public class CreateFieldInput
{
    public Guid EnterpriseCompanyId { get; set; }
    public string FieldName { get; set; } = null!;
    public string? PlssLocation { get; set; }
    public string? PlssState { get; set; }
    public GeoLocationInput? GpsCoordinate { get; set; }
    public ICollection<TagLinkInput>? FieldTagLinks { get; set; }
    public double EstimatedArea { get; set; }
    public string? Notes { get; set; }
    public JsonDocument? FieldBoundaryData { get; set; }
    public string BillingSplitGroupName { get; set; } = null!;
    public ICollection<CreateBillingSplitInput> BillingSplits { get; set; } =
        new List<CreateBillingSplitInput>();
}
