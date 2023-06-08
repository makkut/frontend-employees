import { IAuthorisation } from "@/interfaces/interfaces";
import { Context } from "@/pages/_app";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import { FC, useContext } from "react";
import { ToastContainer } from "react-toastify";

const Authorization: FC<IAuthorisation> = ({ isLogin, handleToast }) => {
  const { store } = useContext(Context);
  function validateName(value: any) {
    let error;
    if (!value) {
      error = "Field is required";
    }
    return error;
  }
  return (
    <>
      <Head>
        <title>Authorization | Employee list</title>
      </Head>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          if (isLogin) {
            store.login(values.email, values.password);
          } else {
            store.registration(values.email, values.password);
          }
        }}
      >
        {(props) => (
          <Form>
            <div className=" pt-6">
              <Field name="email" validate={validateName}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    marginRight={10}
                    height={85}
                  >
                    <FormLabel className="!mb-0">Email</FormLabel>
                    <Input
                      {...field}
                      placeholder="Email"
                      type="email"
                      maxLength={50}
                    />
                    <FormErrorMessage marginTop={0.5}>
                      {form.errors.email}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password" validate={validateName}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                    height={85}
                  >
                    <FormLabel className="!mb-0">Password</FormLabel>
                    <Input
                      {...field}
                      placeholder="password"
                      type="password"
                      maxLength={50}
                    />
                    <FormErrorMessage marginTop={0.5}>
                      {form.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-red-600 hover:bg-red-500 px-[70px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base "
              >
                {isLogin ? "Authorization" : "Registration"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default observer(Authorization);
