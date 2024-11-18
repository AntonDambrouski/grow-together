using GrowTogether.Api.Configurations;
using GrowTogether.Api.Endpoints;
using GrowTogether.Api.Middleware;
using GrowTogether.Api.Seed;
using GrowTogether.Core.Entities;
using GrowTogether.Core.Interfaces;
using GrowTogether.Infrastructure.Data;
using GrowTogether.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddLogging(config =>
{
    config.AddConsole();
    config.AddDebug();
});

builder.Services.AddTransient(p =>
{
    var loggerFactory = p.GetRequiredService<ILoggerFactory>();
    return loggerFactory.CreateLogger("Default Logger");
});

var connectionString = builder.Configuration
    .GetConnectionString("AZURE_SQL_CONNECTIONSTRING");

builder.Services.AddDbContext<ClientContext>(opt =>
    opt.UseSqlServer(connectionString));

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "GrowTogether.Api", Version = "v1" });
});
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddScoped<IProjectsRepository, ProjectsRepository>();
builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<ClientContext>();

builder.Services.AddAuthentication()
    .AddCookie()
    .AddGoogle(opt =>
    {
        var config = builder.Configuration.GetSection("Authentication:Google")
            .Get<GoogleAuthConfiguration>();

        opt.ClientId = config.ClientId;
        opt.ClientSecret = config.ClientSecret;
        opt.CallbackPath = "/signin-google";
    })
    .AddFacebook(opt =>
    {
        opt.AppId = builder.Configuration["Authentication:Facebook:AppId"];
        opt.AppSecret = builder.Configuration["Authentication:Facebook:AppSecret"];
    });

builder.Services.AddCors(opt =>
{
    var origin = Environment.GetEnvironmentVariable("FRONTEND_URL") ?? "http://localhost:3000";
    opt.AddPolicy("FrontendCOrs", p =>
        p.WithOrigins(origin)
        .AllowAnyHeader()
        .AllowAnyMethod());
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;

//    var context = services.GetRequiredService<ClientContext>();
//    context.Database.Migrate();
//    if (!context.Projects.Any())
//    {
//        context.Projects.AddRange(ProjectsSeed.GetSeed(100));
//        context.SaveChanges();
//    }
//}


app.UseMiddleware<ExceptionMiddleware>();
app.UseCors("FrontendCOrs");
app.UseAuthentication();
app.UseAuthorization();

app.MapAuthorizationEndpoints();
app.MapProjectsEndpoints();

app.Run();