using Application.DTO;
using Application.Forms;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> Login(LoginRequest values);
        Task Register(RegisterRequest values);
        Task<UserDto> CurrentUser();
        Task ChangePassword(ChangePasswordRequest values);
        Task UpdateUser(UpdateAccountRequest values);
    }
}
