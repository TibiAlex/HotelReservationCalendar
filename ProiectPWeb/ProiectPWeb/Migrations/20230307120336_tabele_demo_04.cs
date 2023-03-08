using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProiectPWeb.Migrations
{
    /// <inheritdoc />
    public partial class tabele_demo_04 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userRoles",
                table: "Users",
                newName: "userRole");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userRole",
                table: "Users",
                newName: "userRoles");
        }
    }
}
