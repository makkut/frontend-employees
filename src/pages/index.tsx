import EditEmployees from "@/components/EditEmployees";
import NewEmployees from "@/components/NewEmployees";
import ErrorData from "@/components/Error/ErrorData";
import { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import DeleteModal from "@/components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import Authorization from "@/components/Authorization";
import { Context } from "./_app";
import { observer } from "mobx-react-lite";
import EmployeesList from "@/components/EmployeesList";

const Home: NextPage = () => {
  const { store } = useContext(Context);
  const [isAddNewEmployee, setIsAddNewEmployee] = useState(false);
  const [isEditEmployee, setIsEditEmployee] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [idEmployee, setIdEmployee] = useState<string | undefined>();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  const handleToast = (isSuccess: boolean) => {
    isSuccess
      ? toast.success("completed successfully!")
      : toast.error("error, operation failed!");
  };

  if (store.isError) {
    return (
      <main className=" flex justify-center mt-[12rem]">
        <div>
          <ErrorData />
        </div>
      </main>
    );
  }

  if (!store.isAuth) {
    return (
      <div className="flex justify-center">
        <div className="w-[500px]">
          <Authorization isLogin={true} />
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Employee list</title>
      </Head>
      <div className="flex justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold pt-6">
            {store.isAuth
              ? `User ${store.user.email} is authorized`
              : "AUTHORIZE"}
          </h1>
          <h1 className="text-2xl font-bold">
            {store.user.isActivated
              ? "Account verified by mail"
              : "CONFIRM ACCOUNT BY MAIL!!!!"}
          </h1>
          {!store.user.isActivated && (
            <button
              onClick={() => {
                store.logout();
              }}
              className="text-white bg-gray-400 hover:bg-gray-500 px-[70px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base"
            >
              Back
            </button>
          )}
        </div>
      </div>
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
        {store.user.isActivated && <EmployeesList />}
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

export default observer(Home);
