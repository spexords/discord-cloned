using Application.DTO;
using Application.Forms;
using Application.Interfaces;
using Domain;
using Domain.Interfaces;
using Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IJwtGenerator jwtGenerator;

        public UserService(IUserRepository userRepository, IJwtGenerator jwtGenerator)
        {
            this.userRepository = userRepository;
            this.jwtGenerator = jwtGenerator;
        }

        public async Task<UserDto> Login(LoginRequest values)
        {
            var user = (await userRepository.Find(u => u.Username == values.Username && u.HashedPassword == values.Password.ToSHA256())).FirstOrDefault();
            if(user == null)
            {
                throw new Exception("Invalid username or password");
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
                throw new Exception("Username or email is already used");
            }

            var newUser = new User
            {
                Username = values.Username,
                Email = values.Email,
                HashedPassword = values.Password.ToSHA256()
            };

            await userRepository.AddAsync(newUser);
        }
    }
}
