using Application.DTO;
using Application.Errors;
using Application.Forms;
using Application.Interfaces;
using Domain;
using Domain.Interfaces;
using Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IJwtGenerator jwtGenerator;
        private readonly IUserAccessor userAccessor;

        public UserService(IUserRepository userRepository, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
        {
            this.userRepository = userRepository;
            this.jwtGenerator = jwtGenerator;
            this.userAccessor = userAccessor;
        }

        public async Task<UserDto> Login(LoginRequest values)
        {
            var user = (await userRepository.Find(u => u.Username == values.Username && u.HashedPassword == values.Password.ToSHA256())).FirstOrDefault();
            if(user == null)
            {
                throw new RestException(HttpStatusCode.NotFound, "Invalid username or password");
            }

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Token = jwtGenerator.CreateToken(user)
            };
        }

        public async Task Register(RegisterRequest values)
        {
            var user = (await userRepository.Find(u => u.Username == values.Username || u.Email == values.Email)).FirstOrDefault();

            if (user != null)
            {
                throw new RestException(HttpStatusCode.BadRequest, "Username or email is already used");
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
            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Token = jwtGenerator.CreateToken(user)
            };
        }
    }
}
