import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => { 
  const [list, setList] = useState([]);

  // Fetch danh sách món ăn từ API
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Lấy danh sách món ăn không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách món ăn:", error);
      toast.error("Đã xảy ra lỗi khi lấy danh sách món ăn");
    }
  };

  // Xóa món ăn
  const removeFood = async (foodId) => {
    try {
      console.log("Removing food with ID:", foodId);  // Kiểm tra ID món ăn
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
  
      console.log("Response from server:", response.data);  // Kiểm tra phản hồi từ server
  
      if (response.data.success) {
        toast.success(response.data.message);
        // Gọi lại fetchList để lấy lại danh sách mới nhất từ server
        fetchList();
      } else {
        toast.error("Xóa món ăn không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi xóa món ăn:", error);
      toast.error("Đã xảy ra lỗi khi xóa món ăn");
    }
  };
  

  // Gọi hàm fetchList khi trang được load lại
  useEffect(() => {
    fetchList();
  }, []);  // Gọi một lần khi trang load

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
