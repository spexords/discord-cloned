﻿using Domain;
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
                .HasMany(u => u.Messages)
                .WithOne(m => m.User)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Channel>()
                .HasMany(c => c.Messages)
                .WithOne(m => m.Channel)
                .OnDelete(DeleteBehavior.SetNull);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Channel> Channels { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}
