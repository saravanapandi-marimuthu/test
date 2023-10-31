using Horizen.ProductScraper.Models;
using Microsoft.EntityFrameworkCore;

namespace Horizen.Scraper.Data;

public class ScraperDbContext : DbContext
{
    public DbSet<UrlToDownload> Urls { get; set; } = null!;

    public ScraperDbContext(DbContextOptions<ScraperDbContext> options)
        : base(options) { }
}
