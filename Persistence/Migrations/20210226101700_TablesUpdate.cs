using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class TablesUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Subchannel_SubchannelId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Subchannel_Channels_ChannelId",
                table: "Subchannel");

            migrationBuilder.DropForeignKey(
                name: "FK_UserChannel_Channels_ChannelId",
                table: "UserChannel");

            migrationBuilder.DropForeignKey(
                name: "FK_UserChannel_Users_UserId",
                table: "UserChannel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserChannel",
                table: "UserChannel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subchannel",
                table: "Subchannel");

            migrationBuilder.RenameTable(
                name: "UserChannel",
                newName: "UserChannels");

            migrationBuilder.RenameTable(
                name: "Subchannel",
                newName: "Subchannels");

            migrationBuilder.RenameIndex(
                name: "IX_UserChannel_ChannelId",
                table: "UserChannels",
                newName: "IX_UserChannels_ChannelId");

            migrationBuilder.RenameIndex(
                name: "IX_Subchannel_ChannelId",
                table: "Subchannels",
                newName: "IX_Subchannels_ChannelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserChannels",
                table: "UserChannels",
                columns: new[] { "UserId", "ChannelId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subchannels",
                table: "Subchannels",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Subchannels_SubchannelId",
                table: "Messages",
                column: "SubchannelId",
                principalTable: "Subchannels",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Subchannels_Channels_ChannelId",
                table: "Subchannels",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserChannels_Channels_ChannelId",
                table: "UserChannels",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserChannels_Users_UserId",
                table: "UserChannels",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Subchannels_SubchannelId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Subchannels_Channels_ChannelId",
                table: "Subchannels");

            migrationBuilder.DropForeignKey(
                name: "FK_UserChannels_Channels_ChannelId",
                table: "UserChannels");

            migrationBuilder.DropForeignKey(
                name: "FK_UserChannels_Users_UserId",
                table: "UserChannels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserChannels",
                table: "UserChannels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subchannels",
                table: "Subchannels");

            migrationBuilder.RenameTable(
                name: "UserChannels",
                newName: "UserChannel");

            migrationBuilder.RenameTable(
                name: "Subchannels",
                newName: "Subchannel");

            migrationBuilder.RenameIndex(
                name: "IX_UserChannels_ChannelId",
                table: "UserChannel",
                newName: "IX_UserChannel_ChannelId");

            migrationBuilder.RenameIndex(
                name: "IX_Subchannels_ChannelId",
                table: "Subchannel",
                newName: "IX_Subchannel_ChannelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserChannel",
                table: "UserChannel",
                columns: new[] { "UserId", "ChannelId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subchannel",
                table: "Subchannel",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Subchannel_SubchannelId",
                table: "Messages",
                column: "SubchannelId",
                principalTable: "Subchannel",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Subchannel_Channels_ChannelId",
                table: "Subchannel",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserChannel_Channels_ChannelId",
                table: "UserChannel",
                column: "ChannelId",
                principalTable: "Channels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserChannel_Users_UserId",
                table: "UserChannel",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
