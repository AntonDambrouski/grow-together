using GrowTogether.Core.Entities;

namespace GrowTogether.Core.Interfaces;

public interface IProjectsRepository
{
    Task<Project> CreateProjectAsync(Project project);
    Task DeleteProjectAsync(int id);
    Task<Project?> GetProjectByIdAsync(int id);
    Task<List<Project>> GetProjectsAsync(int take, int skip = 0);
    Task<Project> UpdateProjectAsync(Project project);
}
