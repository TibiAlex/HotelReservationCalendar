using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProiectPWeb.Migrations
{
    /// <inheritdoc />
    public partial class tabele_demo_09 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hotels_Users_UserId",
                table: "Hotels");

            migrationBuilder.DropIndex(
                name: "IX_Hotels_UserId",
                table: "Hotels");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Hotels");

            migrationBuilder.AddColumn<int>(
                name: "hotelId",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Users_hotelId",
                table: "Users",
                column: "hotelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Hotels_hotelId",
                table: "Users",
                column: "hotelId",
                principalTable: "Hotels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Hotels_hotelId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_hotelId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "hotelId",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Hotels",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_UserId",
                table: "Hotels",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Hotels_Users_UserId",
                table: "Hotels",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
