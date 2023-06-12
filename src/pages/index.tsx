import EditEmployees from "@/components/EditEmployees";
import NewEmployees from "@/components/NewEmployees";
import ErrorData from "@/components/Error/ErrorData";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import DeleteModal from "@/components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import Authorization from "@/components/Authorization";
import { observer } from "mobx-react-lite";
import EmployeesList from "@/components/EmployeesList";
import { useUser } from "@/store/zustand";
import dynamic from "next/dynamic";

const DynamicSpinner = dynamic(() => import("../components/Spinner"), {
  ssr: false,
});

const Home: NextPage = () => {
  const { checkAuth, isError, isAuth, isLoading, user, logout } = useUser(
    (state: any) => state
  );
  const [isAddNewEmployee, setIsAddNewEmployee] = useState(false);
  const [isEditEmployee, setIsEditEmployee] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [idEmployee, setIdEmployee] = useState<string | undefined>();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);

  const handleToast = (isSuccess: boolean) => {
    isSuccess
      ? toast.success("completed successfully!")
      : toast.error("error, operation failed!");
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
  if (isLoading) {
    return (
      <div className=" flex justify-center mt-[12rem] z-50">
        <DynamicSpinner />
      </div>
    );
  }
  if (!isAuth) {
    return (
      <>
        <div className="flex justify-center">
          <div className="w-[500px]">
            {isLogin ? (
              <>
                <Authorization isLogin={true} handleToast={handleToast} />
                <button
                  className="pt-3 w-[100%] text-end hover:text-red-500"
                  onClick={() => setIsLogin(false)}
                >
                  Registration
                </button>
              </>
            ) : (
              <>
                <Authorization isLogin={false} handleToast={handleToast} />
                <button
                  className="pt-3 w-[100%] text-end hover:text-red-500"
                  onClick={() => setIsLogin(true)}
                >
                  Authorization
                </button>
              </>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Employee list</title>
        </Head>
        <div className="flex justify-center text-center">
          <div>
            <h1 className="text-2xl font-bold pt-6">
              {isAuth ? `User ${user.email} is authorized` : "AUTHORIZE"}
            </h1>
            <h1 className="text-2xl font-bold">
              {user.isActivated
                ? "Account verified by mail"
                : "CONFIRM ACCOUNT BY MAIL!!!!"}
            </h1>
            {!user.isActivated && (
              <button
                onClick={() => {
                  logout();
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
          {user.isActivated && <EmployeesList />}
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
  }
};

export default observer(Home);
