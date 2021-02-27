using Application.Interfaces;
using Application.Services;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System;
using System.Text;

namespace API
{
    public static class ConfigureExtensions
    {
        public static void ConfigureEfSqlServer(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseLazyLoadingProxies();
                opt.UseSqlServer(connectionString);
            });
        }

        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IChannelService, ChannelService>();
            services.AddTransient<ISubchannelService, SubchannelService>();
            services.AddTransient<IMessageService, MessageService>();
        }

        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader()
                          .AllowAnyMethod()
                          .WithOrigins("http://localhost:3000")
                          .AllowCredentials()
                          .WithExposedHeaders("WWW-Authenticate");
                });
            });
        }



        public static void ConfigureControllers(this IServiceCollection services)
        {
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            });
        }

        public static void ConfigureJwt(this IServiceCollection services, string token)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(token));
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(opt =>
            {
                opt.RequireHttpsMetadata = false;
                opt.SaveToken = true;
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });
        }
        public static void ConfigureCustomAuthorizationPolicies(this IServiceCollection services)
        {
            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsChannelCreator", policy =>
                {
                    policy.Requirements.Add(new IsChannelCreatorRequirement());
                });
                opt.AddPolicy("IsCorrectChannelPassword", policy =>
                {
                    policy.Requirements.Add(new IsCorrectChannelPasswordRequirement());
                });
            });
        }

    }
}
