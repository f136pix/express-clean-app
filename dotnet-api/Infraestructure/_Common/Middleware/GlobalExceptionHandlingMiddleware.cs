﻿using System.Net;
using System.Text.Json;
using Application._Common.Exceptions;
using dotnet_api._Common.Models;

namespace dotnet_api._Common.Middleware;

public class GlobalExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public GlobalExceptionHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        Console.Write(exception);

        context.Response.ContentType = "application/json";
        var response = context.Response;
        ResponseModel exModel = new ResponseModel();

        switch (exception)
        {
            case ApplicationException ex:
                exModel.ResponseCode = (int)HttpStatusCode.BadRequest;
                response.StatusCode = (int)HttpStatusCode.BadRequest;
                exModel.ResponseMessage = "Application Exception occurred, Please try again later";
                break;
            case NotFoundException ex:
                exModel.ResponseCode = (int)HttpStatusCode.BadRequest;
                response.StatusCode = (int)HttpStatusCode.BadRequest;
                exModel.ResponseMessage = ex.Message;
                break;
            case AlreadyExistsException ex:
                exModel.ResponseCode = (int)HttpStatusCode.BadRequest;
                response.StatusCode = (int)HttpStatusCode.BadRequest;
                exModel.ResponseMessage = ex.Message;
                break;
            default:
                exModel.ResponseCode = (int)HttpStatusCode.InternalServerError;
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                exModel.ResponseMessage = "Internal Server Error, Please try again later";
                break;
        }

        var exResult = JsonSerializer.Serialize(exModel);
        await context.Response.WriteAsync(exResult);
    }
}