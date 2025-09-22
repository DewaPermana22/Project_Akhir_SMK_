using System.ComponentModel.DataAnnotations;

namespace sia_api_cs.DTO.Authentication
{
    public class AuthDTO
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email Must Be Filled")]
        public string email { get; set; } = "setyopuji@gmailcom";

        [Required(ErrorMessage = "Password Must Be Filled")]
        public string password { get; set; } = "9988776655443322";
    }
}
