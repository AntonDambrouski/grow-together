using GrowTogether.Core.Entities;
using GrowTogether.Core.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Facebook;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GrowTogether.Api.Endpoints;

public static class AuthorizationEndpoints
{
    public static void MapAuthorizationEndpoints(this WebApplication app)
    {
        var authGroup = app.MapGroup("/api/auth");
        authGroup.MapGet("/google-login",
            () => ExternalLoginAsync(GoogleDefaults.AuthenticationScheme, "/api/auth/external-callback"))
            .WithOpenApi()
            .WithDescription("Login with Google");

        authGroup.MapGet("/facebook-login",
            () => ExternalLoginAsync(FacebookDefaults.AuthenticationScheme, "/api/auth/external-callback"))
            .WithOpenApi()
            .WithDescription("Login with Facebook");

        authGroup.MapGet("/external-callback", ExternalCallbackAsync)
            .WithOpenApi()
            .WithDescription("Handle Facebook's challenge");
    }

    private static IResult ExternalLoginAsync(string provider, string redirectUrl)
    {
        var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
        properties.Items.Add("LoginProvider", provider);

        return Results.Challenge(properties, [provider]);
    }

    private static async Task<IResult> ExternalCallbackAsync([FromQuery] string? returnUrl,
        [FromServices] UserManager<AppUser> userManager,
        [FromServices] SignInManager<AppUser> signInManager)
    {
        var info = await signInManager.GetExternalLoginInfoAsync();
        if (info == null)
            return Results.BadRequest();

        var email = info.Principal.FindFirstValue(ClaimTypes.Email);
        if (email == null)
        {
            return Results.BadRequest();
        }

        // Create a new user without password if we do not have a user already
        var user = await userManager.FindByEmailAsync(email);
        if (user == null)
        {
            user = new AppUser
            {
                UserName = email,
                Email = info.Principal.FindFirstValue(ClaimTypes.Email)
            };

            await userManager.CreateAsync(user);
        }

        // Add a login (i.e insert a row for the user in AspNetUserLogins table)
        await userManager.AddLoginAsync(user, info);
        await signInManager.SignInAsync(user, isPersistent: false);

        return Results.Redirect("/");
    }
}
