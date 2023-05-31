import {
  EmployeeInterfaceValue,
  EmployeesProps,
} from "@/interfaces/interfaces";
import { useAddEmployeeMutation } from "@/store/employeesApi";
import { FC } from "react";
import ModalEmployee from "./ModalEmployee";

const NewEmployees: FC<EmployeesProps> = ({
  setIsModal,
  isEdit,
  handleToast,
}) => {
  const [addEmployee] = useAddEmployeeMutation();
  const onSubmit = async (values: EmployeeInterfaceValue) => {
    try {
      await addEmployee({
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
      });
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
