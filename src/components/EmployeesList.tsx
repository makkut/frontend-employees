import EditEmployees from "@/components/EditEmployees";
import NewEmployees from "@/components/NewEmployees";
import ErrorData from "@/components/Error/ErrorData";
import { EmployeeInterface } from "@/interfaces/interfaces";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import DeleteModal from "@/components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import { useEmployees, useUser } from "@/store/zustand";

const EmployeesList = () => {
  const logout = useUser((state: any) => state.logout);
  const { getEmployees, isError, employees } = useEmployees(
    (state: any) => state
  );
  const [isAddNewEmployee, setIsAddNewEmployee] = useState(false);
  const [isEditEmployee, setIsEditEmployee] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [idEmployee, setIdEmployee] = useState<string | undefined>();

  useEffect(() => {
    getEmployees();
  }, []);

  const handleToast = (isSuccess: boolean) => {
    isSuccess
      ? toast.success("completed successfully!")
      : toast.error("error, operation failed!");
  };

  const handleDeleteEmployee = (id: string | undefined) => {
    setIsDeleteModal(true);
    setIdEmployee(id);
  };

  const handleUpdateEmployee = (id: string | undefined) => {
    setIsEditEmployee(true);
    setIdEmployee(id);
  };

  if (isError) {
    return (
      <main className=" flex justify-center mt-[12rem]">
        <div>
          <ErrorData />
        </div>
      </main>
    );
  }
  return (
    <>
      <Head>
        <title>Employee list</title>
      </Head>
      <main className=" flex justify-center items-center">
        {isAddNewEmployee && (
          <NewEmployees
            setIsModal={setIsAddNewEmployee}
            isEdit={true}
            handleToast={handleToast}
          />
        )}
        {isEditEmployee && (
          <EditEmployees
            setIsModal={setIsEditEmployee}
            isEdit={true}
            id={idEmployee}
            handleToast={handleToast}
          />
        )}

        <div className="text-center pt-[15px]">
          <h1 className="text-2xl font-bold">Employee list</h1>
          <button
            onClick={() => {
              setIsAddNewEmployee(true);
            }}
            className="text-white bg-red-600 hover:bg-red-500 px-[70px] py-[9px] mt-3 duration-500 rounded-[5px] font-bold text-base"
          >
            Add New Employee
          </button>
          <button
            onClick={() => {
              logout();
            }}
            className="text-white bg-gray-400 hover:bg-gray-500 px-[70px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base ml-5"
          >
            Logout
          </button>
          <TableContainer className="mt-3">
            {employees.length !== 0 ? (
              <Table variant="striped" colorScheme="blue">
                <Thead>
                  <Tr>
                    <Th>first name</Th>
                    <Th>last name</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employees.map((e: EmployeeInterface) => (
                    <Tr key={e._id}>
                      <Td>{e.firstname}</Td>
                      <Td>{e.lastname}</Td>
                      <Td>
                        <div className="flex">
                          <RiEditBoxLine
                            size={23}
                            className="mr-2 cursor-pointer"
                            onClick={() => {
                              handleUpdateEmployee(e._id);
                            }}
                          />
                          <RiDeleteBin6Line
                            className="cursor-pointer"
                            size={23}
                            onClick={() => {
                              handleDeleteEmployee(e._id);
                            }}
                          />
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <p className="text-lg">List is empty</p>
            )}
          </TableContainer>
        </div>
      </main>
      <ToastContainer />
      <DeleteModal
        isDeleteModal={isDeleteModal}
        id={idEmployee}
        setIsDeleteModal={setIsDeleteModal}
        handleToast={handleToast}
      />
    </>
  );
};
export default observer(EmployeesList);
