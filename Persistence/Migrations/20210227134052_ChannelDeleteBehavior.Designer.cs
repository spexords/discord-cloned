﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210227134052_ChannelDeleteBehavior")]
    partial class ChannelDeleteBehavior
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Domain.Channel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("HashedPassword")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("Channels");
                });

            modelBuilder.Entity("Domain.Message", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("SubchannelId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("SubchannelId");

                    b.HasIndex("UserId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("Domain.Subchannel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ChannelId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ChannelId");

                    b.ToTable("Subchannels");
                });

            modelBuilder.Entity("Domain.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("HashedPassword")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique()
                        .HasFilter("[Email] IS NOT NULL");

                    b.HasIndex("Username")
                        .IsUnique()
                        .HasFilter("[Username] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain.UserChannel", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ChannelId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsCreator")
                        .HasColumnType("bit");

                    b.HasKey("UserId", "ChannelId");

                    b.HasIndex("ChannelId");

                    b.ToTable("UserChannels");
                });

            modelBuilder.Entity("Domain.Message", b =>
                {
                    b.HasOne("Domain.Subchannel", "Subchannel")
                        .WithMany("Messages")
                        .HasForeignKey("SubchannelId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Domain.User", "User")
                        .WithMany("Messages")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Subchannel");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Subchannel", b =>
                {
                    b.HasOne("Domain.Channel", "Channel")
                        .WithMany("Subchannels")
                        .HasForeignKey("ChannelId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Channel");
                });

            modelBuilder.Entity("Domain.UserChannel", b =>
                {
                    b.HasOne("Domain.Channel", "Channel")
                        .WithMany("UserChannels")
                        .HasForeignKey("ChannelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.User", "User")
                        .WithMany("UserChannels")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Channel");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Channel", b =>
                {
                    b.Navigation("Subchannels");

                    b.Navigation("UserChannels");
                });

            modelBuilder.Entity("Domain.Subchannel", b =>
                {
                    b.Navigation("Messages");
                });

            modelBuilder.Entity("Domain.User", b =>
                {
                    b.Navigation("Messages");

                    b.Navigation("UserChannels");
                });
#pragma warning restore 612, 618
        }
    }
}
