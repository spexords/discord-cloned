using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SubchannelsConnection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ChannelId",
                table: "Subchannel",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subchannel_ChannelId",
                table: "Subchannel",
                column: "ChannelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subchannel_Channels_ChannelId",
                table: "Subchannel",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subchannel_Channels_ChannelId",
                table: "Subchannel");

            migrationBuilder.DropIndex(
                name: "IX_Subchannel_ChannelId",
                table: "Subchannel");

            migrationBuilder.DropColumn(
                name: "ChannelId",
                table: "Subchannel");
        }
    }
}
