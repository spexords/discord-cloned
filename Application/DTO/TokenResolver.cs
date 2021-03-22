using Application.Interfaces;
using AutoMapper;
using Domain;

namespace Application.DTO
{
    public class TokenResolver : IValueResolver<User, UserDto, string>
    {
        private readonly IJwtGenerator jwtGenerator;

        public TokenResolver(IJwtGenerator jwtGenerator)
        {
            this.jwtGenerator = jwtGenerator;
        }
        public string Resolve(User source, UserDto destination, string destMember, ResolutionContext context)
        {
            return jwtGenerator.CreateToken(source);
        }
    }

}
