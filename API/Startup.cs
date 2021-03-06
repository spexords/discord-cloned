using API.Middlewares;
using API.SignalR;
using Application.Interfaces;
using Application.Services;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        
        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            services.ConfigureEfSqlServer(Configuration.GetConnectionString("DefaultConnection"));


            ConfigureServices(services);
        }

        public void ConfigureProductionServices(IServiceCollection services)
        {
            services.ConfigureSqlLite(Configuration.GetConnectionString("DefaultConnection"));


            ConfigureServices(services);
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.ConfigureCors();

            services.ConfigureBusinessServices();

            services.AddAutoMapper(typeof(UserService).Assembly);

            services.AddSignalR();

            services.ConfigureControllers();

            services.AddHttpContextAccessor();

            services.ConfigureCustomAuthorizationPolicies();
            services.AddTransient<IAuthorizationHandler, IsChannelCreatorHandler>();
            services.AddTransient<IAuthorizationHandler, IsCorrectChannelPasswordHandler>();

            services.ConfigureJwt(Configuration["JwtTokenKey"]);

            services.AddScoped<IJwtGenerator, JwtGenerator>();

            services.AddScoped<IUserAccessor, UserAccessor>();
        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
