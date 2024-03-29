﻿using Application.DTO;
using Application.Forms;
using Application.Interfaces;
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

        ///api/user/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody]RegisterRequest values)
        {
            await userService.Register(values);
            return Ok();
        }

        ///api/user/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginRequest values)
        {
            return Ok(await userService.Login(values));
        }

        ///api/user    
        [HttpGet]
        public async Task<ActionResult<UserDto>> CurrentUser()
        {
            return Ok(await userService.CurrentUser());
        }

        ///api/user/password
        [HttpPut("password")]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordRequest values)
        {
            await userService.ChangePassword(values);
            return Ok();
        }

        ///api/user
        [HttpPut]
        public async Task<ActionResult> UpdateUser([FromBody] UpdateAccountRequest values)
        {
            await userService.UpdateUser(values);
            return Ok();
        }
    }
}
