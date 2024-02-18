using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TrinityB2BWeb.Models
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
        public string SelectedAnswer { get; set; }
    }
    public class LogoutInMsg
    {
        public int Is_Login { get; set; }
    }
    public class UserDetails
    {
        public int USERID { get; set; }
        public string USERNAME { get; set; }
        public string PASSWORD { get; set; }
        public string PARTYCODE { get; set; }
        
        public string COMPANY { get; set; }
        public string CONTACTPERSONNAME { get; set; }
        public string USERTYPE { get; set; }
        public string TOKEN { get; set; }
        public string EMAIL { get; set; }
        public string CONTACTNO { get; set; }
        public string MOBILE { get; set; }
        public string DEFAULTDIAMONDCOLOR { get; set; }
        public string DEFAULTDIAMONDPURITY { get; set; }
        public string POLICY { get; set; }
        public string LANGUAGE { get; set; }
        public string CURRENCYCODE { get; set; }
        public string FLAGIMG { get; set; }
        public int COUNTRYID { get; set; }
        public string COUNTRYNAME { get; set; }

    }
    public class CartDetails
    {
        public string GPURITY { get; set; }
        public string GCOLOR { get; set; }
        public string DPURITY { get; set; }
        public string DCOLOR { get; set; }
        public string DSIZE { get; set; }
        public string CUSTUMIZENOTES { get; set; }
        public string ISCUSTOMIZE { get; set; }
        public string CARTID { get; set; }
        public string CARTTOPRODUCT { get; set; }
        

    }
    public class NavigationMenulist
    {
        public string SUBCATEGORYNAME { get; set; }
       
    }
    public class Menulist
    {
        public string Modulecategory { get; set; }

    }


    //public class MenuDetails
    //{
    //    public int MODULEID { get; set; }
    //    public string MODULETEXT { get; set; }
    //}
    public class Product
    {
       
        public string PRODUCTNAME { get; set; }
        public string CATEGORYIMAGE { get; set; }
        public int DISPLAYORDER { get; set; }
        public string CATEGORY { get; set; }
       
    }
    public class MensProduct
    {

        public string PRODUCTNAME { get; set; }
        public string CATEGORYIMAGE { get; set; }
        public int DISPLAYORDER { get; set; }
        public string CATEGORY { get; set; }

    }
    public class WomansProduct
    {

        public string PRODUCTNAME { get; set; }
        public string CATEGORYIMAGE { get; set; }
        public int DISPLAYORDER { get; set; }
        public string CATEGORY { get; set; }

    }

    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
