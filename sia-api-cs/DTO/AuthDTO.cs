using System.ComponentModel.DataAnnotations;

namespace sia_api_cs.DTO
{
    public class AuthDTO
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email Must Be Filled")]
        public string email { get; set; }
        [Required(ErrorMessage = "Password Must Be Filled")]
        public string password { get; set; }
    }
}
