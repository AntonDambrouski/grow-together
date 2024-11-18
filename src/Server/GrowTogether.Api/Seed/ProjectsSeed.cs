using Bogus;
using GrowTogether.Core.Entities;

namespace GrowTogether.Api.Seed;

public class ProjectsSeed
{
    public static List<Project> GetSeed(int count) =>
        new Faker<Project>().RuleFor(p => p.Title, f => f.Hacker.Phrase())
            .RuleFor(p => p.Description, f => f.Lorem.Paragraphs(3))
            .RuleFor(p => p.IsAiGenerated, f => f.Random.Bool())
            .RuleFor(p => p.UserId, f => Guid.Empty.ToString())
            .Generate(count);
}