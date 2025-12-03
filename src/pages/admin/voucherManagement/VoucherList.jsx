import React, { useEffect, useState } from "react";
import { useModal } from "../../../helper/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import { getVouchers, getVoucherTypes } from "../../../store/voucher/voucherServices";
import { boolean } from "yup";
import CreateVouchers from "../../../Components/Modals/admin/CreateVouchers";
import CreateVoucherType from "../../../Components/Modals/admin/CreateVoucherType";

function VoucherList() {
  const dispatch = useDispatch();
  const vouchers = useSelector((state) => state.voucher.vouchers);
  const pagination = useSelector((state) => state.voucher.pagination);
  const voucherTypes = useSelector((state) => state.voucher.voucherTypes);
  const loading = useSelector((state) => state.voucher.loading);
  const { openModal, closeModal } = useModal();

  const [isUsed, setIsUsed] = useState(boolean);
  const [voucherType, setVoucherType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  console.log(pagination);
  

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
      }, 500);  // 500ms delay
  
      return () => {
        clearTimeout(handler);
      };
    }, [searchTerm]);

  useEffect(() => {
    dispatch(getVouchers({
      page: currentPage,
      limit: usersPerPage,
      voucherType,
      search: debouncedSearchTerm,
      used: isUsed
    }));
  }, [dispatch, currentPage, usersPerPage, voucherType, debouncedSearchTerm, isUsed]);

  useEffect(() => {
    setCurrentPage(1);
  }, [voucherType, isUsed]);

  useEffect(() => {
    if (!voucherTypes || voucherTypes.length === 0) {
      dispatch(getVoucherTypes());
    }
  }, [dispatch, voucherTypes]);
  


  const totalPages = pagination?.totalPages || 1;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  const createVoucher = () => {
    openModal(<CreateVouchers onClose={() => closeModal()} />);
  };

  const createVoucherType = () => {
    openModal(<CreateVoucherType onClose={() => closeModal()} />);
  };

  if (loading) return <Loader loading />;


  return (
    <div className="h-full p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Vouchers</h1>
        <div className="flex gap-4">
          <button
            className="bg-[#0072CF] text-white px-6 py-2 rounded-full"
            onClick={createVoucher}
          >
            Create Voucher
          </button>
          <button
            className="bg-[#0072CF] text-white px-6 py-2 rounded-full"
            onClick={createVoucherType}
          >
            Create Voucher Type
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex gap-4">
          <select
            className="p-2 border rounded"
            value={voucherType}
            onChange={(e) => setVoucherType(e.target.value)}
          >
            <option value="">Select Type</option>
            {voucherTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>


          {/* Level Filter */}
          <select
            className="p-2 border rounded"
            value={isUsed}
            onChange={(e) => setIsUsed(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="true">Used</option>
            <option value="false">Not Used</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by Assigned To"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#F2F4FF]">
            <tr>
              <th className="p-4 text-left text-sm text-[#292929]">Voucher Name</th>
              <th className="p-4 text-left text-sm text-[#292929]">
                Voucher Type
              </th>
              <th className="p-4 text-left text-sm text-[#292929]">
                Assigned To
              </th>
              <th className="p-4 text-left text-sm text-[#292929]">
                discount
              </th>
              <th className="p-4 text-left text-sm text-[#292929]">
                Expiry Date
              </th>
              <th className="p-4 text-left text-sm text-[#292929]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {vouchers?.length > 0 ? (
              vouchers?.map((v) => (
                <tr key={v._id}>
                  <td className="p-4 text-sm text-[#292929]">{v.voucherName}</td>
                  <td className="p-4 text-sm font-medium text-[#292929]">{v.voucherType}</td>
                  <td className="p-4 text-sm text-[#292929]">{v.assignedEmail}</td>
                  <td className="p-4 text-sm text-[#292929]">{v.discount}</td>
                  <td className="p-4 text-sm text-[#292929]">
                    {new Date(v.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-[#292929]">
                    {v.used ? (
                      <span className="text-green-500">Used</span>
                    ) : (
                      <span className="text-red-500">Not Used</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No voucher found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded"
        >
          Previous
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <select
            className="p-2 border rounded"
            value={usersPerPage}
            onChange={(e) => setUsersPerPage(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default VoucherList;
