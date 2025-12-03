import React from "react";
import { LuFileText, LuCloudUpload, LuEllipsisVertical } from "react-icons/lu";
import { useModal } from "../../../helper/ModalContext";
import CreateFolderModal from "../../../Components/Modals/admin/CreateFolderModal";

const folderItems = [
  { name: "Chemistry (502)", size: "604KB" },
  { name: "Chemistry (502)", size: "2.20GB" },
  { name: "Chemistry (502)", size: "1.46MB" },
  { name: "Chemistry (502)", size: "1.46MB" },
  { name: "Chemistry (502)", size: "929KB" },
];

export default function ContentManagement() {
  const { openModal, closeModal } = useModal();

  const modalHandle = () => {
    openModal(<CreateFolderModal onClose={() => closeModal()} />);
  };
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Create Custom Folder Button */}
      <div className="flex justify-end mb-6">
        <button
          className="bg-[#0072CF] text-white px-6 py-3 rounded-full flex items-center gap-2"
          onClick={() => modalHandle()}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#FFB74D"
              className="w-5 h-5"
            >
              <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
            </svg>
          </div>
          <span className="text-sm font-medium tracking-wide">
            CREATE CUSTOM FOLDER
          </span>
        </button>
      </div>

      {/* Folder List */}
      <div className="overflow-x-auto border-t border-[#E5E7EB] space-y-1">
        <table className="min-w-full bg-white">
          <tbody className="divide-y divide-gray-200">
            {folderItems.map((folder, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {/* {course.thumbnail && ( */}
                    <img
                      src={
                        //   course.thumbnail ||
                        "/assets/svgs/folderAdd.svg"
                      }
                      alt={folder.name}
                      className="w-10 h-10 rounded mr-3"
                    />
                    {/* )} */}
                    <div>
                      <div
                        className="font-medium text-gray-900 cursor-pointer"
                        onClick={() => handleRowClick()}
                      >
                        {folder.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="space-x-3 flex justify-end items-center mr-5">
                    <button className="border text-xs px-2 py-1 rounded">
                      {folder.size}
                    </button>
                    <button className="">
                      <LuEllipsisVertical />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
