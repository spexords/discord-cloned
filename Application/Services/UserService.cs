using Application.DTO;
using Application.Errors;
using Application.Forms;
using Application.Interfaces;
using Domain;
using Domain.Interfaces;
using Extensions;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IUserAccessor userAccessor;
        private readonly IMapper mapper;

        public UserService(IUserRepository userRepository, IUserAccessor userAccessor, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.userAccessor = userAccessor;
            this.mapper = mapper;
        }

        public async Task<UserDto> Login(LoginRequest values)
        {
            var user = (await userRepository.Find(u => u.Username == values.Username && u.HashedPassword == values.Password.ToSHA256())).FirstOrDefault();
            if(user == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { details = "Invalid username or password" });
            }

            return mapper.Map<UserDto>(user);
        }

        public async Task Register(RegisterRequest values)
        {
            var user = (await userRepository.Find(u => u.Username == values.Username || u.Email == values.Email)).FirstOrDefault();

            if (user != null)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { details = "Username or email is already used" });
            }

            var newUser = new User
            {
                Username = values.Username,
                Email = values.Email,
                HashedPassword = values.Password.ToSHA256()
            };

            await userRepository.AddAsync(newUser);
        }

        public async Task<UserDto> CurrentUser()
        {
            var user = (await userRepository.Find(u => u.Username == userAccessor.GetCurrentUsername())).FirstOrDefault();
            return mapper.Map<UserDto>(user);
        }

        public async Task ChangePassword(ChangePasswordRequest values)
        {
            var user = (await userRepository.Find(u => u.Username == userAccessor.GetCurrentUsername() && 
                                                       u.HashedPassword == values.CurrentPassword.ToSHA256()))
                                                       .FirstOrDefault();
            if(user == null)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { details = "Invalid password" });
            }
            user.HashedPassword = values.NewPassword.ToSHA256();
            await userRepository.UpdateAsync(user);
        }

        public async Task UpdateUser(UpdateAccountRequest values)
        {
            var user = (await userRepository.Find(u => u.Username == userAccessor.GetCurrentUsername())).FirstOrDefault();
            user.Email = values.Email ?? user.Email;
            await userRepository.UpdateAsync(user);
        }

  
    }
}
