using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics.CodeAnalysis;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserChannel>()
                .HasKey(uc => new { uc.UserId, uc.ChannelId});

            modelBuilder.Entity<UserChannel>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserChannels)
                .HasForeignKey(uc => uc.UserId);

            modelBuilder.Entity<UserChannel>()
                .HasOne(uc => uc.Channel)
                .WithMany(u => u.UserChannels)
                .HasForeignKey(uc => uc.ChannelId);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Channel>()
                .HasIndex(c => c.Name)
                .IsUnique();

            modelBuilder.Entity<Channel>()
                .HasMany(c => c.Subchannels)
                .WithOne(sc => sc.Channel)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Messages)
                .WithOne(m => m.User)
                .OnDelete(DeleteBehavior.SetNull);


            modelBuilder.Entity<Subchannel>()
                .HasMany(c => c.Messages)
                .WithOne(m => m.Subchannel)
                .OnDelete(DeleteBehavior.SetNull);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Channel> Channels { get; set; }
        public DbSet<Subchannel> Subchannels { get; set; }
        public DbSet<UserChannel> UserChannels { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}
