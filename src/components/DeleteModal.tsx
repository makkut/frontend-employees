import { DeleteModalProps } from "@/interfaces/interfaces";
import { useEmployees } from "@/store/zustand";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { FC, useContext } from "react";

const DeleteModal: FC<DeleteModalProps> = ({
  id,
  isDeleteModal,
  setIsDeleteModal,
  handleToast,
}) => {
  const { deleteEmployee } = useEmployees((state: any) => state);
  return (
    <>
      <Modal
        isOpen={isDeleteModal}
        onClose={() => {
          setIsDeleteModal(false);
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            Are you sure you want to delete it?
          </ModalHeader>
          <ModalBody>
            <div className="flex justify-center pb-4">
              <button
                onClick={async () => {
                  try {
                    await deleteEmployee(id);
                    setIsDeleteModal(false);
                    handleToast(true);
                  } catch (error) {
                    handleToast(false);
                  }
                }}
                className="text-white bg-red-600 hover:bg-red-500 px-[50px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base mr-10"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setIsDeleteModal(false);
                }}
                className="text-white bg-gray-400 hover:bg-gray-500 px-[50px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base"
              >
                Cancel
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
