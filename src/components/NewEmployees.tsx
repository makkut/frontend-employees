import {
  EmployeeInterface,
  EmployeeInterfaceValue,
  EmployeesProps,
} from "@/interfaces/interfaces";
import { FC } from "react";
import ModalEmployee from "./ModalEmployee";
import { useEmployees } from "@/store/zustand";

const NewEmployees: FC<EmployeesProps> = ({
  setIsModal,
  isEdit,
  handleToast,
}) => {
  const { addEmployee } = useEmployees((state: any) => state);
  const onSubmit = async (values: EmployeeInterfaceValue) => {
    try {
      addEmployee({
        firstname: values.firstname,
        lastname: values.lastname,
        birthdate: values.birthdate.split("-").reverse().join("."),
        phone: values.phone,
        address: {
          city: values.city,
          zip: String(values.zip),
          street: values.street,
          number: values.number,
        },
      } as EmployeeInterface);
      handleToast(true);
      setIsModal(false);
    } catch (error) {
      handleToast(false);
    }
  };
  const initialValues = {
    firstname: "",
    lastname: "",
    birthdate: "",
    phone: "",
    city: "",
    zip: "",
    street: "",
    number: "",
  };
  return (
    <div className="flex justify-center ">
      <ModalEmployee
        setIsModal={setIsModal}
        isEdit={isEdit}
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </div>
  );
};
export default NewEmployees;
