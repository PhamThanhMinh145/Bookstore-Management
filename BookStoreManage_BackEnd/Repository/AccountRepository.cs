#nullable disable
using System.Text;
using System.Text.RegularExpressions;
using BookStoreManage.DTO;
using BookStoreManage.Entity;
using BookStoreManage.IRepository;
using Microsoft.EntityFrameworkCore;

namespace BookStoreManage.Repository;

public class AccountRepository : IAccountRepository
{
    private readonly BookManageContext _context;
    public AccountRepository(BookManageContext context)
    {
        _context = context;
    }

    public async Task<List<Account>> GetAll()
    {
        var accountList = await _context.Accounts.Include(a => a.Orders).ToListAsync();
        return accountList;
    }

    public async Task<List<Account>> GetByName(string name)
    {
        var nameList = await _context.Accounts.Where(a => a.Owner.Trim().ToLower().Contains(name.Trim().ToLower())).Include(a => a.Orders).ToListAsync();
        return nameList;
    }

    public async Task<Account> FindByID(int id)
    {
        var account = await _context.Accounts.Include(a => a.Orders).FirstOrDefaultAsync(a => a.AccountID == id);
        return account;
    }

    public async Task<List<Account>> GetByRole(int roleId){
        var account = await _context.Accounts.Where(a => a.RoleID == roleId).Include(a => a.Orders).ToListAsync();
        return account;
    }

    public async Task EditAccount(AccountDto _account, int id)
    {
        var acc = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountID == id);

        string phone = Base64Encode(_account.Phone);
        string email = Base64Encode(_account.AccountEmail);
        string address = Base64Encode(_account.AccountAddress);

        acc.Owner = _account.Owner;
        acc.AccountEmail = email;
        acc.Phone = phone;
        acc.AccountAddress = address;
        acc.Image = _account.Image;
        acc.Country = _account.Country;
        // acc.Status = _account.Status;
        acc.RoleID = _account.RoleID;

        _context.Accounts.Update(acc);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAccount(int id)
    {
        var acc = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountID == id);
        _context.Accounts.Remove(acc);
        await _context.SaveChangesAsync();
    }

    public async Task ChangeStatus(int id, ChangeStatusDto status)
    {
        var acc = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountID == id);

        acc.Status = status.Status;

        _context.Accounts.Update(acc);
        await _context.SaveChangesAsync();
    }

    public string Base64Encode(string textStr)
    {
        var textbytes = Encoding.UTF8.GetBytes(textStr);
        return Convert.ToBase64String(textbytes);
    }

    public string Base64Decode(string decodeStr)
    {
        var strBytes = Convert.FromBase64String(decodeStr);
        return Encoding.UTF8.GetString(strBytes);
    }
}