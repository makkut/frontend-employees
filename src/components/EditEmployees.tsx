import { FC, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  EmployeeInterfaceValue,
  EmployeesProps,
} from "@/interfaces/interfaces";
import ModalEmployee from "./ModalEmployee";
import { useEmployees } from "@/store/zustand";
import _ from "lodash";

const DynamicSpinner = dynamic(() => import("../components/Spinner"), {
  ssr: false,
});

const Employees: FC<EmployeesProps> = ({
  setIsModal,
  id,
  isEdit,
  handleToast,
}) => {
  const { getEmployee, updateEmployee, employee } = useEmployees(
    (state: any) => state
  );

  useEffect(() => {
    getEmployee(id);
  }, []);

  const onSubmit = async (values: EmployeeInterfaceValue) => {
    try {
      await updateEmployee(id, {
        _id: id,
        firstname: values.firstname,
        lastname: values.lastname,
        birthdate: values.birthdate.split("-").reverse().join("."),
        phone: values.phone,
        address: {
          city: values.city,
          zip: values.zip,
          street: values.street,
          number: values.number,
        },
      });
      setIsModal(false);
      handleToast(true);
    } catch (error) {
      handleToast(false);
    }
  };

  return (
    <>
      {!_.isEmpty(employee) ? (
        <div className="flex justify-center ">
          <ModalEmployee
            setIsModal={setIsModal}
            isEdit={isEdit}
            onSubmit={onSubmit}
            initialValues={{
              firstname: employee.firstname,
              lastname: employee.lastname,
              phone: employee.phone,
              birthdate: employee.birthdate.split(".").reverse().join("-"),
              city: employee.address.city,
              zip: employee.address.zip,
              street: employee.address.street,
              number: employee.address.number,
            }}
          />
        </div>
      ) : (
        <DynamicSpinner />
      )}
    </>
  );
};
export default Employees;
