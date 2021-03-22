using Application.DTO;
using Application.Errors;
using Application.Forms;
using Application.Interfaces;
using Domain;
using Extensions;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext dataContext;
        private readonly IUserAccessor userAccessor;
        private readonly IMapper mapper;

        public UserService(DataContext dataContext, IUserAccessor userAccessor, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.userAccessor = userAccessor;
            this.mapper = mapper;
        }

        public async Task<UserDto> Login(LoginRequest values)
        {
            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Username == values.Username && u.HashedPassword == values.Password.ToSHA256());
            if(user == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Invalid username or password" });
            }

            return mapper.Map<UserDto>(user);
        }

        public async Task Register(RegisterRequest values)
        {
            if (await dataContext.Users.AnyAsync(u => u.Username == values.Username || u.Email == values.Email))
            {
                throw new RestException(HttpStatusCode.BadRequest, new { details = "Username or email is already used" });
            }

            var user = new User
            {
                Username = values.Username,
                Email = values.Email,
                HashedPassword = values.Password.ToSHA256()
            };

            await dataContext.AddAsync(user);
            var success = await dataContext.SaveChangesAsync() > 0;
            if(!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }

        }

        public async Task<UserDto> CurrentUser()
        {
            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Username == userAccessor.GetCurrentUsername());
            return mapper.Map<UserDto>(user);
        }

        public async Task ChangePassword(ChangePasswordRequest values)
        {
            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Username == userAccessor.GetCurrentUsername() 
                                                                && u.HashedPassword == values.CurrentPassword.ToSHA256());
            if(user == null)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { details = "Invalid password" });
            }
            user.HashedPassword = values.NewPassword.ToSHA256();
            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }
        }

        public async Task UpdateUser(UpdateAccountRequest values)
        {
            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Username == userAccessor.GetCurrentUsername());
            user.Email = values.Email ?? user.Email;
            var success = await dataContext.SaveChangesAsync() > 0;
            if (!success)
            {
                throw new Exception("Problem occured during saving changes.");
            }
        }
    }
}
