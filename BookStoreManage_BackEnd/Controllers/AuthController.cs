using Microsoft.AspNetCore.Mvc;
using BookStoreManage.Entity;
using BookStoreManage.IRepository;
using BookStoreManage.DTO;
using Microsoft.AspNetCore.Authorization;
using FirebaseAdmin.Auth;

namespace BookStoreManage.Controllers
{
    [Route("[controller]")]
    [ApiController]
    // [Authorize]
    public class AuthController : ControllerBase
    {
        private static Account account = new Account();
        private readonly IAuthRepository _authRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly BookManageContext _context;
        public AuthController(IAuthRepository authRepository, IAccountRepository accountRepository, BookManageContext context)
        {
            _accountRepository = accountRepository;
            _authRepository = authRepository;
            _context = context;
        }

        // [HttpPost("register")]
        // public async Task<ActionResult<Account>> Register(AuthDto request)
        // {
        //     try
        //     {
        //         await _authRepository.Register(request);
        //         return Ok(_context.Accounts.ToList());
        //     }
        //     catch (Exception e)
        //     {
        //         return BadRequest(e.Message);
        //     }
        // }

        [HttpPost("login")]
        public async Task<ActionResult<Account>> Login(AuthDto request)
        {
            try
            {
                var acc = await _authRepository.CheckLogin(request);
                string token = _authRepository.CreateToken(acc);

                var refreshToken = _authRepository.GenerateRefreshToken();
                var setToken = _authRepository.SetRefreshToken(refreshToken, Response);

                account = acc;
                account.RefreshToken = setToken.RefreshToken;
                account.TokenExpires = setToken.TokenExpires;

                TokenDto dto = new TokenDto();

                dto.Token = token;
                dto.AccountEmail = _accountRepository.Base64Decode(acc.AccountEmail); ;
                dto.Owner = acc.Owner;
                dto.Image = acc.Image;
                dto.Role = acc.Role.RoleName;

                return Ok(dto);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("logout"), Authorize(Roles = "Admin,Customer,Staff")]
        public ActionResult Logout(string token)
        {
            try
            {
                token = "";
                return Ok(token);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // [HttpPost("refresh-token")]
        // public ActionResult<string> RefreshToken()
        // {
        //     try
        //     {
        //         var refreshToken = Request.Cookies["refreshToken"];
        //         if (account.RefreshToken.Equals(refreshToken))
        //         {
        //             return Unauthorized("Invalid Refresh Token.");
        //         }
        //         else if (account.TokenExpires < DateTime.Now)
        //         {
        //             return Unauthorized("Token expired.");
        //         }

        //         string token = _authRepository.CreateToken(account);
        //         var newRefreshToken = _authRepository.GenerateRefreshToken();
        //         var setToken = _authRepository.SetRefreshToken(newRefreshToken, Response);

        //         account.RefreshToken = setToken.RefreshToken;
        //         account.TokenExpires = setToken.TokenExpires;

        //         TokenDto dto = new TokenDto();
        //         dto.Token = token;

        //         return Ok(dto);
        //     }
        //     catch (Exception e)
        //     {
        //         return BadRequest(e.Message);
        //     }
        // }

        [HttpPost("verify-access-token/{accessToken}")]
        public async Task<IActionResult> VerifyAccessToken(string accessToken)
        {
            try
            {
                bool isNewUser = false;
                var result = await _authRepository.AuthenFirebase(isNewUser, accessToken);
                if (result == null)
                {
                    var message = new MessageDto(){
                        Message = "Please verify your email!",
                        isNewUser = true
                    };
                    return Ok(message);
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("email-verify/{verify}&{accessToken}")]
        public async Task<IActionResult> EmailVerify(bool verify, string accessToken)
        {
            try
            {
                if (verify == true)
                {
                    bool isNewUser = true;
                    var result = await _authRepository.AuthenFirebase(isNewUser, accessToken);
                    if (result == null)
                    {
                        return Ok("OK");
                    }
                }
                return Ok("Fail to verify!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("authen"), Authorize(Roles = "Admin,Staff")]
        public ActionResult<Account> Authen()
        {
            return Ok(_context.Accounts.ToList());
        }
    }
}