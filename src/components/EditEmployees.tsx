import { useDisclosure } from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  EmployeeInterfaceValue,
  EmployeesProps,
} from "@/interfaces/interfaces";
import ModalEmployee from "./ModalEmployee";
import EmployeeService from "@/services/EmployeeService";
import { Context } from "@/pages/_app";

const DynamicSpinner = dynamic(() => import("../components/Spinner"), {
  ssr: false,
});

const Employees: FC<EmployeesProps> = ({
  setIsModal,
  id,
  isEdit,
  handleToast,
}) => {
  const { onClose } = useDisclosure();
  const [editValues, setEditValues] = useState<EmployeeInterfaceValue>();
  const { store } = useContext(Context);

  useEffect(() => {
    getEmployee();
  }, []);

  async function getEmployee() {
    try {
      const response = await EmployeeService.fetchEmployee(id);
      const initialValues = {
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        phone: response.data.phone,
        birthdate: response.data.birthdate.split(".").reverse().join("-"),
        city: response.data.address.city,
        zip: response.data.address.zip,
        street: response.data.address.street,
        number: response.data.address.number,
      };
      setEditValues(initialValues);
    } catch (e) {
      console.log(e);
    }
  }

  const onSubmit = async (values: EmployeeInterfaceValue) => {
    try {
      await store.updateEmployee(id, {
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
      {editValues ? (
        <div className="flex justify-center ">
          <ModalEmployee
            setIsModal={setIsModal}
            isEdit={isEdit}
            onSubmit={onSubmit}
            initialValues={editValues}
          />
        </div>
      ) : (
        <DynamicSpinner />
      )}
    </>
  );
};
export default Employees;
