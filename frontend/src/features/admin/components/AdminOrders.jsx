import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrderAsync, selectOrders, updateOrderAsync } from "../../order/orderSlice";
import { selectAllOrders } from "../../user/userSlice";
import { PencilIcon, EyeIcon, ChevronLeftIcon, ChevronRightIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
// import { ITEMS_PER_PAGE } from "../../../app/constant";
const ITEMS_PER_PAGE=10


function AdminOrders() {
  const [editableId, setEditableId] = useState(-1);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [sort, setSort] = useState({});

  
  const handleEdit = (order) => {
    setEditableId(order.id);
    console.log("handleEDIT");
  };

  const handleShow = (e) => {
    console.log("handleShow");
  };

  const orders = useSelector(selectAllOrders);
  console.log("my orders are ", orders);

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _start: page * 10, _limit: ITEMS_PER_PAGE };
    const sort = {};
    dispatch(fetchAllOrderAsync({ pagination, sort }));
  }, [dispatch, page]);

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log("sorting :- ", { sort });
    setSort(sort);
  };

  const handleUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableId(-1);
  };


  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return `bg-purple-200 text-purple-600`;

      case "delivered":
        return `bg-green-200 text-green-600`;

      case "cancel":
        return `bg-red-200 text-red-600`;

      case "dispatch":
        return `bg-yellow-200 text-yellow-600`;

      default:
        return `bg-yellow-200 text-yellow-600`;
    }
  };



  return (
    <div>
      {orders && orders.length !== 0 ? (
        <div className="overflow-x-auto">
          <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full ">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th
                        className="py-3 px-6 text-left cursor-pointer flex"
                        onClick={(e) =>
                          handleSort({
                            sort: "id",
                            order: sort?._order === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        Order Number{" "}
                        {sort._sort === "id" &&
                          (sort._order === "asc" ? (
                            <ArrowUpIcon className="w-4 h-4" />
                          ) : (
                            <ArrowDownIcon className="w-4 h-4" />
                          ))}
                      </th>
                      <th className="py-3 px-6 text-left">Items</th>
                      <th className="py-3 px-6 text-center">Total Amount</th>
                      <th className="py-3 px-6 text-center">
                        Shipping Address
                      </th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2"></div>
                            <span className="font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {order.cart.map((item) => (
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item.thumbnail}
                                />
                              </div>
                              <span>{item.title} </span>
                            </div>
                          ))}
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            {order.totalAmount}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className=" items-center justify-center">
                            <strong>{order.selectedAddress.name}</strong>
                            <div>{order.selectedAddress.email}</div>
                            <div> {order.selectedAddress.phone},</div>
                            <div> {order.selectedAddress.street},</div>
                            <div> {order.selectedAddress.city},</div>
                            <div>{order.selectedAddress.state},</div>
                            <div> {order.selectedAddress.pincode},</div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          {order.id === editableId ? (
                            <select 
                            onChange={(e) => handleUpdate(e, order)}
                            >
                              <option value="choose">choose status</option>
                              <option value="pending">Pending</option>
                              <option value="Dispatch">Dispatch</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancel">Cancel</option>
                            </select>
                          ) : (
                            <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                              <EyeIcon
                                className="w-6 h-6"
                                onClick={(e) => handleShow(order)}
                              />
                            </div>
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                              <PencilIcon
                                className="w-6 h-6"
                                onClick={(e) => handleEdit(order)}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination page={page} setPage={setPage} handlePage={handlePage} />
        </div>
      ) : (
        <div>
          <h1>No Orders to Show</h1>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;


function Pagination({ handlePage, page, setPage, totalItems = 20 }) {
    const totalPages=Math.ceil(totalItems/ITEMS_PER_PAGE)
    return (
      <div>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
  
            <div
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              onClick={(e) =>handlePage(page>0?(page-1):page)}
            >
              Previous
            </div>
  
            <div
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              onClick={(e) =>handlePage(page<totalPages-1?(page+1):page)}
            >
              Next
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{page * ITEMS_PER_PAGE + 1}</span>{" "}
                to{" "}
                <span className="font-medium">
                  {page * ITEMS_PER_PAGE + 10 > totalItems
                    ? totalItems
                    : page * ITEMS_PER_PAGE + 10}
                </span>{" "}
                of <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <div
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  onClick={(e) =>handlePage(page>0?(page-1):page)}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
  
                {Array.from({
                  length: Math.ceil(totalItems / ITEMS_PER_PAGE),
                }).map((el, index) => (
                  <div
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center ${index  === page ? "bg-indigo-600 text-white " : "bg-white text-black"} cursor-pointer px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    onClick={(e) => handlePage(index)}
                  >
                    {index + 1}
                  </div>
                ))}
  
                <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 cursor-pointer" 
                     onClick={(e) =>handlePage(page<totalPages-1?(page+1):page)} 
                >
                  <span className="sr-only">
                    Next
                  </span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }