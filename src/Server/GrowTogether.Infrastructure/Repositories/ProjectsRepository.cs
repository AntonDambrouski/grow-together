using GrowTogether.Core.Entities;
using GrowTogether.Core.Interfaces;
using GrowTogether.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GrowTogether.Infrastructure.Repositories;

public class ProjectsRepository(ClientContext context) : IProjectsRepository
{
    public async Task<List<Project>> GetProjectsAsync(int take, int skip = 0)
    {
        return await context.Projects.OrderByDescending(p => p.Title)
            .Skip(skip)
            .Take(take)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Project?> GetProjectByIdAsync(int id)
    {
        return await context.Projects
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Project> CreateProjectAsync(Project project)
    {
        await context.Projects.AddAsync(project);
        await context.SaveChangesAsync();
        return project;
    }

    public async Task<Project> UpdateProjectAsync(Project project)
    {
        context.Projects.Update(project);
        await context.SaveChangesAsync();
        return project;
    }

    public async Task DeleteProjectAsync(int id)
    {
        var project = await context.Projects.FindAsync(id);
        context.Projects.Remove(project);
        await context.SaveChangesAsync();
    }
}
