import {
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from "@/store/employeesApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FC } from "react";
import ErrorData from "./Error/ErrorData";
import router from "next/router";
import dynamic from "next/dynamic";
import {
  EmployeeInterfaceValue,
  EmployeesProps,
} from "@/interfaces/interfaces";
import ModalEmployee from "./ModalEmployee";

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
  const [updateEmployee] = useUpdateEmployeeMutation();
  const data = useGetEmployeeQuery({ id });

  if (data.isLoading) {
    return (
      <>
        <DynamicSpinner />
      </>
    );
  }
  if (data.isError) {
    return (
      <div className="flex justify-center ">
        <Modal onClose={onClose} isOpen={data.isError} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalBody className="flex justify-center items-center " pt={50}>
              <ErrorData />
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => router.reload()}>Back</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  }

  const onSubmit = async (values: EmployeeInterfaceValue) => {
    try {
      await updateEmployee({
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
  const initialValues = {
    firstname: data.data.firstname,
    lastname: data.data.lastname,
    phone: data.data.phone,
    birthdate: data.data.birthdate.split(".").reverse().join("-"),
    city: data.data.address.city,
    zip: data.data.address.zip,
    street: data.data.address.street,
    number: data.data.address.number,
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
export default Employees;
