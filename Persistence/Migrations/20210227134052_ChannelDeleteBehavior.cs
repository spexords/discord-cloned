using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ChannelDeleteBehavior : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subchannels_Channels_ChannelId",
                table: "Subchannels");

            migrationBuilder.AddForeignKey(
                name: "FK_Subchannels_Channels_ChannelId",
                table: "Subchannels",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subchannels_Channels_ChannelId",
                table: "Subchannels");

            migrationBuilder.AddForeignKey(
                name: "FK_Subchannels_Channels_ChannelId",
                table: "Subchannels",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
