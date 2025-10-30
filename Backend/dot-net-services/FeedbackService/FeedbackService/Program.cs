using FeedbackService.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

namespace FeedbackService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // ✅ Use connection string from appsettings.json
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            // ✅ Bind to Railway's dynamic port
            var port = Environment.GetEnvironmentVariable("PORT") ?? "4000";
            builder.WebHost.UseUrls($"http://0.0.0.0:{port}");


            // ✅ Add services
            builder.Services.AddControllers();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });

            // ✅ Setup EF Core with MySQL
            builder.Services.AddDbContext<FeedbackDbContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

            // ✅ Swagger setup
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Feedback API", Version = "v1" });
            });

            var app = builder.Build();

            // ✅ Middleware
            app.UseHttpsRedirection(); // <-- important for Railway HTTPS
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseCors("AllowAll");
            app.UseAuthorization();

            // ✅ Map controllers
            app.MapControllers();

            // ✅ Apply migrations automatically
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<FeedbackDbContext>();
                try
                {
                    db.Database.Migrate();
                    Console.WriteLine("✅ Database connected and migrated successfully.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine("❌ Error connecting to database: " + ex.Message);
                }
            }

            // ✅ Redirect root to Swagger
            app.MapGet("/", () => Results.Redirect("/swagger"));

            app.Run();
        }
    }
}
