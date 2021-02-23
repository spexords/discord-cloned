using Application.Extensions;
using Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            await SeedUsers(context);
            await context.SaveChangesAsync();
        }

        private static async Task SeedUsers(DataContext context)
        {
            var users = new List<User>
            {
                new User
                {
                    Id = Guid.NewGuid(),
                    Email = "andrzejek@gmail.com",
                    Username = "andrzejek",
                    HashedPassword = "test".ToSHA256()
                }
            };

            await context.AddRangeAsync(users);
        }
    }
}
