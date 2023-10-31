using Microsoft.Extensions.Logging;
using Horizen.Data.Services.Configurations;
using Horizen.Data.Errors;
using Horizen.Data.Services.Configurations.Inputs;
using Microsoft.Extensions.Configuration;
using Horizen.Core.Utilities;

namespace Horizen.DataSprout.Seeders;

public class TagSeeder : ISeeder
{
    private readonly ILogger<TagSeeder> _logger;
    private readonly string _dataPath;

    private readonly string _tagsFile = "tags.json";
    private readonly TagService _tagService;

    public TagSeeder(ILogger<TagSeeder> logger, IConfiguration configuration, TagService tagService)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _dataPath = configuration.GetValue<string>("DataPath") ?? "./data";
        _tagService = tagService ?? throw new ArgumentNullException(nameof(tagService));
    }

    public async Task SeedAsync()
    {
        _logger.LogInformation("Seeding Tags");

        //var tagCategories = GetDefaultTagCategories();
        var tagCategories = await JsonUtility.LoadFromFileAsync<
            ICollection<CreateTagCategoryInput>
        >(Path.Combine(_dataPath, _tagsFile));

        foreach (var tagCategory in tagCategories)
        {
            try
            {
                await _tagService.CreateTagCategoryAsync(tagCategory);
            }
            catch (EntityAlreadyExistsException ex)
            {
                _logger.LogWarning(ex.Message);
            }
        }
    }

    private ICollection<CreateTagCategoryInput> GetDefaultTagCategories()
    {
        var tagCategories = new List<CreateTagCategoryInput>();

        var enterpriseTagNames = new List<string> { "Field", "ShipTo", "Tank", };

        BuildTagCategoryWithTags(tagCategories, "Enterprise Item Type", enterpriseTagNames);

        var customerLevelTagNames = new List<string> { "Platinum", "Gold", "Silver", };

        BuildTagCategoryWithTags(tagCategories, "Customer Level", customerLevelTagNames);

        var years = Enumerable.Range(2020, 11).Select(year => year.ToString()).ToList();

        BuildTagCategoryWithTags(tagCategories, "Crop Year", years);

        var cropNames = new List<string>
        {
            "Corn",
            "Soybeans",
            "Wheat",
            "Cotton",
            "Hay",
            "Rice",
            "Barley",
            "Sorghum",
            "Oats",
            "Peanuts",
        };

        BuildTagCategoryWithTags(tagCategories, "Crop", cropNames);

        var cropTypes = new List<string> { "Conventional", "GMO", "Organic", };

        BuildTagCategoryWithTags(tagCategories, "Crop Type", cropTypes);

        BuildTagCategoryWithTags(
            tagCategories,
            "Billing Split Tier 1",
            new List<string> { "Enterprise Item" }
        );

        BuildTagCategoryWithTags(
            tagCategories,
            "Billing Split Tier 2",
            new List<string> { "Products", "Services" }
        );

        BuildTagCategoryWithTags(
            tagCategories,
            "Billing Split Tier 3",
            new List<string>
            {
                "Products:Fuel",
                "Products:Chemicals",
                "Products:Seed",
                "Products:Fertilizer",
                "Products:Other",
                "Services:Application",
                "Services:SoilSampling",
                "Services:Scouting",
                "Services:Delivery",
                "Services:ArialImagery",
                "Services:Other",
            }
        );

        BuildTagCategoryWithTags(
            tagCategories,
            "Billing Split Tier 4",
            new List<string> { "Products", "Services", "Other" }
        );

        BuildTagCategoryWithTags(
            tagCategories,
            "Product Type",
            new List<string> { "Chemical", "Seed", "Fertilizer", "Equipment", "Mineral", "Other", }
        );

        BuildTagCategoryWithTags(
            tagCategories,
            "Package Type",
            new List<string> { "Base", "Case", "Bulk", "Mini Bulk", "Bag", "Tote", "Other", }
        );

        BuildTagCategoryWithTags(
            tagCategories,
            "Field Layer Type",
            new List<string>
            {
                "Field Boundary",
                "Soil Sampling Grids",
                "Soil Health Maps",
                "Yield Maps",
                "Crop Zone",
                "Irrigation Zone",
                "Pest/Disease Pressure Zones",
                "Elevation/Topography",
                "Management Zones", // Till vs No-Till
                "Weather Stations/Sensors",
                "Fertilizer Application",
                "Chemical Application",
                "Seed Application",
                "Irrigation Application",
                "Cover Crop",
                "Tillage",
                "Lime/Gypsum Application",
                "Other",
            }
        );

        BuildTagCategoryWithTags(
            tagCategories,
            "Vendor Type",
            new List<string> { "Seed", "Chemical", "Fertilizer", "Equipment", "Other" }
        );

        BuildTagCategoryWithTags(
            tagCategories,
            "Storage Location Types",
            new List<string>
            {
                "Warehouse Zone",
                "Storage Aisle",
                "Storage Rack",
                "Storage Bay",
                "Storage Shelf",
                "Storage Container",
            }
        );

        BuildTagCategoryWithTags(
            tagCategories,
            "Nutrient",
            new List<string>
            {
                "Nitrogen (N)", // N
                "Phosphorus (P2O5)", // P2O5
                "Potassium (K20)", // K2O
                "Sulfur (S)", // S
                "Calcium carbonate equivalent (CCE)", // CCE
                "Zinc (Zn)", // Zn
                "Boron (B)", // B
                "Magnesium (Mg)", // Mg
                "Metabolizable protein (MP)", // MP
                "Sulfate (S04)", // SO4
                "Iron (Fe)", // Fe
                "Copper (Cu)", // Cu
                "Molybdenum (Mo)", // Mo
                "Chlorine (Cl)", // Cl
                "Calcium (Ca)", // Ca
                "Gypsum (CaSO4)", // CaSO4}
            }
        );

        BuildTagCategoryWithTags(
            tagCategories,
            "Subsidiary Type",
            new List<string> { "Full Service Retailer", "Fertilizer Hub" }
        );

        return tagCategories;
    }

    private static void BuildTagCategoryWithTags(
        ICollection<CreateTagCategoryInput> tagCategories,
        string tagCategoryName,
        IEnumerable<string> tagName
    )
    {
        var tagCategoryColorIndex = 0;
        var tagColorIndex = 0;

        tagCategories.Add(
            new CreateTagCategoryInput
            {
                Name = tagCategoryName,
                ColorIndex = tagCategoryColorIndex++ / ColorConstants.MaxNumberOfColors,
                Tags = tagName
                    .Select(
                        name =>
                            new CreateTagInput
                            {
                                Name = name,
                                ColorIndex = tagColorIndex++ / ColorConstants.MaxNumberOfColors,
                            }
                    )
                    .ToList(),
            }
        );
    }
}
