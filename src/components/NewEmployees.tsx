import {
  EmployeeInterface,
  EmployeeInterfaceValue,
  EmployeesProps,
} from "@/interfaces/interfaces";
import { FC, useContext } from "react";
import ModalEmployee from "./ModalEmployee";
import { Context } from "@/pages/_app";

const NewEmployees: FC<EmployeesProps> = ({
  setIsModal,
  isEdit,
  handleToast,
}) => {
  const { store } = useContext(Context);
  const onSubmit = async (values: EmployeeInterfaceValue) => {
    try {
      store.addEmployee({
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
