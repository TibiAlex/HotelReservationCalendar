using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProiectPWeb.Migrations
{
    /// <inheritdoc />
    public partial class tabele_demo_05 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userRole",
                table: "Users",
                newName: "role");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "role",
                table: "Users",
                newName: "userRole");
        }
    }
}
