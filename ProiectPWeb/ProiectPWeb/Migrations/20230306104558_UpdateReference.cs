using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProiectPWeb.Migrations
{
    /// <inheritdoc />
    public partial class UpdateReference : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "product_id",
                table: "order");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "product_id",
                table: "order",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
