import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import NumberFormat from "react-number-format";

const ModalEmployee = ({
  setIsModal,
  isEdit,
  initialValues,
  onSubmit,
}: any) => {
  function validateName(value: any) {
    let error;
    if (!value) {
      error = "Field is required";
    }
    return error;
  }

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isEdit}
        onClose={() => {
          setIsModal(false);
        }}
      >
        <ModalOverlay />
        <ModalContent maxHeight={600} maxWidth={800} rounded={45}>
          <ModalHeader pt={30} textAlign={"center"} pb={-10}>
            Add New Employee
          </ModalHeader>
          <ModalBody pb={30} px={55}>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {(props) => (
                <Form>
                  <div className="flex pt-6">
                    <Field name="firstname" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.firstname && form.touched.firstname
                          }
                          marginRight={10}
                          height={85}
                        >
                          <FormLabel className="!mb-0">First name</FormLabel>
                          <Input
                            {...field}
                            placeholder="first name"
                            type="text"
                            maxLength={50}
                          />
                          <FormErrorMessage marginTop={0.5}>
                            {form.errors.firstname}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="lastname" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.lastname && form.touched.lastname
                          }
                          height={85}
                        >
                          <FormLabel className="!mb-0">Last name</FormLabel>
                          <Input
                            {...field}
                            placeholder="last name"
                            type="text"
                            maxLength={50}
                          />
                          <FormErrorMessage marginTop={0.5}>
                            {form.errors.lastname}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </div>
                  <div className="flex">
                    <Field name="birthdate" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.birthdate && form.touched.birthdate
                          }
                          marginRight={10}
                          height={85}
                        >
                          <FormLabel className="!mb-0">Birthday</FormLabel>
                          <Input
                            {...field}
                            placeholder="birthdate"
                            type="date"
                          />
                          <FormErrorMessage marginTop={0.5}>
                            {form.errors.birthdate}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="phone" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.phone && form.touched.phone}
                          height={85}
                        >
                          <FormLabel className="!mb-0">Phone</FormLabel>
                          <Input
                            {...field}
                            placeholder="phone"
                            type="text"
                            maxLength={20}
                          />
                          <FormErrorMessage marginTop={0.5}>
                            {form.errors.phone}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </div>
                  <div className="flex">
                    <Field name="city" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.city && form.touched.city}
                          marginRight={10}
                          height={85}
                        >
                          <FormLabel className="!mb-0">City</FormLabel>
                          <Input
                            {...field}
                            placeholder="city"
                            type="text"
                            maxLength={40}
                          />
                          <FormErrorMessage marginTop={0.5}>
                            {form.errors.city}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="zip" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.phone && form.touched.phone}
                          height={85}
                        >
                          <FormLabel className="!mb-0">Zip</FormLabel>
                          <Input
                            as={NumberFormat}
                            {...field}
                            placeholder="zip"
                            type="number"
                            maxLength={10}
                          />
                          <FormErrorMessage marginTop={0.5}>
                            {form.errors.zip}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </div>
                  <div className="flex">
                    <Field name="street" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.street && form.touched.street}
                          marginRight={10}
                          height={85}
                        >
                          <FormLabel className="!mb-0">Street</FormLabel>
                          <Input
                            {...field}
                            placeholder="street"
                            type="text"
                            maxLength={40}
                          />
                          <FormErrorMessage marginTop={0.5}>
                            {form.errors.street}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="number" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.number && form.touched.number}
                          height={85}
                        >
                          <FormLabel className="!mb-0">Number</FormLabel>
                          <Input
                            {...field}
                            placeholder="number"
                            type="text"
                            maxLength={20}
                          />
                          <FormErrorMessage marginTop={0.5}>
                            {form.errors.number}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="text-white bg-red-600 hover:bg-red-500 px-[70px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base mr-10"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setIsModal(false)}
                      className="text-white bg-gray-400 hover:bg-gray-500 px-[70px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEmployee;
