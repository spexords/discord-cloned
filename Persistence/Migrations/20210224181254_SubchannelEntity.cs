using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SubchannelEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Channels_ChannelId",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "ChannelId",
                table: "Messages",
                newName: "SubchannelId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_ChannelId",
                table: "Messages",
                newName: "IX_Messages_SubchannelId");

            migrationBuilder.CreateTable(
                name: "Subchannel",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subchannel", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Subchannel_SubchannelId",
                table: "Messages",
                column: "SubchannelId",
                principalTable: "Subchannel",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Subchannel_SubchannelId",
                table: "Messages");

            migrationBuilder.DropTable(
                name: "Subchannel");

            migrationBuilder.RenameColumn(
                name: "SubchannelId",
                table: "Messages",
                newName: "ChannelId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_SubchannelId",
                table: "Messages",
                newName: "IX_Messages_ChannelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Channels_ChannelId",
                table: "Messages",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
