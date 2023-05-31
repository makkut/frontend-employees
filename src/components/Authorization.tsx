import { useActions } from "@/hooks/useActions";
import { useRegisterMutation, useLoginMutation } from "@/store/employeesApi";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const Authorization = () => {
  const { setIsLoggedIn } = useActions();
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  function validateName(value: any) {
    let error;
    if (!value) {
      error = "Field is required";
    }
    return error;
  }
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            const res = await register({
              email: values.email,
              password: values.password,
            });
            console.log("res", res);
            // if (res.error?.status === 200) {
            //   const resp = await login({
            //     email: values.email,
            //     password: values.password,
            //   });
            //   setIsLoggedIn();
            //   console.log(resp);
            // }
          } catch (error) {}
        }}
        // onSubmit={async (values, actions) => {
        //   try {
        //     const responseData = await axios.post(
        //       `${process.env.API_URL}/api/auth/local/register`,
        //       {
        //         email: values.email,
        //         password: values.password,
        //         username: values.username,
        //       }
        //     );
        //     console.log("responseData", responseData);
        //     if (responseData.status == 200) {
        //       const result = await signIn("credentials", {
        //         redirect: false,
        //         email: values.email,
        //         password: values.password,
        //       });
        //       if (result?.ok) {
        //         router.push("/profile");
        //         return;
        //       }
        //       toast.error("email/password is not valid");
        //       actions.setSubmitting(false);
        //     }
        //     toast.error("Error");
        //   } catch (error: any) {
        //     toast.error(error.response.data.error.message);
        //     console.error(error);
        //   }
        // }}
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
                Confirm
              </button>
              {/* <button
                onClick={() => {}}
                className="text-white bg-gray-400 hover:bg-gray-500 px-[70px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base"
              >
                Cancel
              </button> */}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Authorization;
