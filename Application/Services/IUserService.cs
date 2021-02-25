using Application.DTO;
using Application.Forms;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IUserService
    {
        Task<UserDto> Login(LoginRequest values);
        Task Register(RegisterRequest values);
        Task<UserDto> CurrentUser();
    }
}
