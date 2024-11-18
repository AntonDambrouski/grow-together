
using GrowTogether.Core.Entities;
using GrowTogether.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GrowTogether.Api.Endpoints;

public static class ProjectsEndpoints
{
    public static void MapProjectsEndpoints(this WebApplication app)
    {
        var projectsGroup = app.MapGroup("/api/projects");

        projectsGroup.MapGet("", GetAllProjectsAsync)
            .WithOpenApi()
            .WithDescription("Get all projects");

        projectsGroup.MapGet("/{id}", GetProjectByIdAsync)
            .WithOpenApi()
            .WithDescription("Get a project by id");

        projectsGroup.MapPost("", CreateProjectAsync)
            .WithOpenApi()
            .WithDescription("Create a project")
            .RequireAuthorization();

        projectsGroup.MapPut("/{id:int}", UpdateProjectAsync)
            .WithOpenApi()
            .WithDescription("Update a project")
            .RequireAuthorization();

        projectsGroup.MapDelete("/{id}", DeleteProjectAsync)
            .WithOpenApi()
            .WithDescription("Delete a project")
            .RequireAuthorization();
    }

    private static async Task<IResult> DeleteProjectAsync([FromRoute] int id,
        [FromServices] IProjectsRepository projectsRepository)
    {
        await projectsRepository.DeleteProjectAsync(id);
        return Results.NoContent();
    }

    private static async Task<IResult> UpdateProjectAsync([FromBody] Project project,
        [FromRoute] int id,
        [FromServices] ILogger logger,
        [FromServices] IProjectsRepository projectsRepository)
    {
        try
        {
            project.Id = id;
            await projectsRepository.UpdateProjectAsync(project);
            return Results.NoContent();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Message: {message}.", ex.Message);
            return Results.Problem("Internal Server Error", statusCode: 500);
        }
    }

    private static async Task<IResult> CreateProjectAsync([FromBody] Project project,
        [FromServices] ILogger logger,
        [FromServices] IProjectsRepository projectsRepository)
    {
        try
        {
            await projectsRepository.CreateProjectAsync(project);
            return Results.Created($"/api/projects/{project.Id}", project);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Message: {message}.", ex.Message);
            return Results.Problem("Internal Server Error", statusCode: 500);
        }
        
    }

    private static async Task<IResult> GetProjectByIdAsync(IProjectsRepository projectsRepository)
    {
        var project = await projectsRepository.GetProjectByIdAsync(1);
        if (project == null)
        {
            return Results.NotFound();
        }

        return Results.Ok(project);
    }

    private static async Task<IResult> GetAllProjectsAsync([FromQuery] int take,
        [FromQuery] int skip,
        [FromServices] IProjectsRepository projectsRepository)
    {
        var projects = await projectsRepository.GetProjectsAsync(take, skip);
        return Results.Ok(projects);
    }
}
