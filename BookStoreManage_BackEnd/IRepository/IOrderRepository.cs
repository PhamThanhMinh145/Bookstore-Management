using BookStoreManage.DTO;
using BookStoreManage.Entity;

namespace BookStoreManage.IRepository;

public interface IOrderRepository {
    Task<List<Order>> GetAll();
    Task<List<Order>> FindByOrderID(int id);

    Task<List<Order>> FindByCustomerID(int id);

    Task<OrderDetail> FindByOrderDetailID(int id);
    Task<int> CreateNewOrder(int accountId);
    Task UpdateStatus(int id, ChangeStatusDto status);
    Task CreateNewOrderDetail(List<OrderDetailDto> _list);
    Task DeleteOrder(int id);
}