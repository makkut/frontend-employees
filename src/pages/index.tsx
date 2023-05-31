import EditEmployees from "@/components/EditEmployees";
import NewEmployees from "@/components/NewEmployees";
import ErrorData from "@/components/Error/ErrorData";
import { EmployeeInterface } from "@/interfaces/interfaces";
import { useGetEmployeesQuery } from "@/store/employeesApi";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import DeleteModal from "@/components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import Authorization from "@/components/Authorization";
import { useSelector } from "react-redux";

const DynamicSpinner = dynamic(() => import("../components/Spinner"), {
  ssr: false,
});

const Home: NextPage = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  console.log("isLoggedIn", isLoggedIn);
  const data = useGetEmployeesQuery();
  const [isAddNewEmployee, setIsAddNewEmployee] = useState(false);
  const [isEditEmployee, setIsEditEmployee] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [idEmployee, setIdEmployee] = useState<string | undefined>();
  console.log("data", data);
  const handleToast = (isSuccess: boolean) => {
    isSuccess
      ? toast.success("completed successfully!")
      : toast.error("error, operation failed!");
  };

  const handleDeleteEmployee = (id: string) => {
    setIsDeleteModal(true);
    setIdEmployee(id);
  };

  const handleUpdateEmployee = (id: string) => {
    setIsEditEmployee(true);
    setIdEmployee(id);
  };

  if (data.isError) {
    return (
      <main className=" flex justify-center mt-[12rem]">
        <div>
          <ErrorData />
        </div>
      </main>
    );
  }

  if (data.isLoading) {
    return (
      <div className=" flex justify-center mt-[12rem]">
        <DynamicSpinner />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Employee list</title>
      </Head>

      {/* {!isLoggedIn && (
        <div className="flex justify-center">
          <div className="w-[500px]">
            <Authorization />
          </div>
        </div>
      )} */}

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
          <TableContainer className="mt-3">
            {data?.data?.length !== 0 ? (
              <Table variant="striped" colorScheme="blue">
                <Thead>
                  <Tr>
                    <Th>first name</Th>
                    <Th>last name</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.data?.map((e: EmployeeInterface) => (
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

export default Home;
