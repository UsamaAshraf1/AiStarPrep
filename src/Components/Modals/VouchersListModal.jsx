import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuX } from "react-icons/lu";
import Loader from "../Loader";
import { getVouchersByUser } from "../../store/voucher/voucherServices";

function VouchersListModal({ onClose, onApply }) {
  const { vouchers, loading } = useSelector((state) => state.voucher);
  const vouchersList = Array.isArray(vouchers) ? vouchers : [];
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(getVouchersByUser());
    }
    fetchData();
  }, [dispatch]);

  if (loading) return <Loader loading />;

  return (
    <div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <LuX className="w-5 h-5" />
      </button>
      {vouchersList?.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Your vouchers</h2>

          <table className="w-full rounded-lg overflow-hidden">
            <thead>
              <tr className="border-b text-[#475156] text-sm font-medium">
                <th className="p-2 text-left md:col-span-2">Voucher Code</th>
                <th className="p-2 text-left md:col-span-2">Voucher Name</th>
                <th className="p-2 text-left">Discount</th>
                <th className="p-2 pr-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {vouchersList.map((voucher) => (
                <tr
                  key={voucher._id}
                  className="border-b last:border-0 text-sm items-center"
                >
                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[#0072CF] text-sm">{voucher.code}</h3>
                    </div>
                  </td>

                  <td className="p-2 text-gray-900">
                    {voucher.voucherName}
                  </td>

                  <td className="p-2 text-gray-900">
                    {voucher.discount}% Off
                  </td>

                  <td className="p-2">
                    <button
                      onClick={() => onApply(voucher.code)}
                      className="text-[#0072CF] text-sm px-4 py-1 border border-[#0072CF] rounded-full bg-white hover:bg-blue-50 transition"
                    >
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </>
      ) : (
        <div className="bg-white p-6 text-center space-y-4">
          <p className="text-lg font-semibold text-gray-800">
            You don’t have any Voucher right now.
          </p>
        </div>
      )}
    </div>

  );
}

export default VouchersListModal;
