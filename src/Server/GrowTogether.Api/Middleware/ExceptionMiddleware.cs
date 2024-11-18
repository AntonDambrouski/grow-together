using Microsoft.AspNetCore.Mvc;
using System.Net;
using GrowTogether.Core.Exceptions;

namespace GrowTogether.Api.Middleware;

public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Message: {message}.", ex.Message);

            int statusCode = (int)HttpStatusCode.InternalServerError;
            var details = "Internal Server Error";
            switch (ex)
            {
                case ArgumentException or ArgumentNullException:
                    details = ex.Message;
                    statusCode = (int)HttpStatusCode.BadRequest;
                    break;

                case AppDomainException:
                    details = ex.Message;
                    statusCode = (int)HttpStatusCode.InternalServerError;

                    break;
            }

            context.Response.StatusCode = statusCode;
            await context.Response.WriteAsJsonAsync(new ProblemDetails
            {
                Title = "An error occurred",
                Detail = details,
                Status = statusCode
            });
        }
    }

}
