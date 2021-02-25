using Application.DTO;
using Application.Forms;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody]RegisterRequest values)
        {
            await userService.Register(values);
            return Ok();
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginRequest values)
        {
            return Ok(await userService.Login(values));
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> CurrentUser()
        {
            return Ok(await userService.CurrentUser());
        }
    }
}
