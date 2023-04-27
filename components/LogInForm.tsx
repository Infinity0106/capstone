import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { Button } from "./Button";

type LogInFormProps = {
  onSubmit: (values: { email: string; name: string }) => void;
};

export const LogInForm: React.FC<LogInFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", name: "" }}
      onSubmit={onSubmit}
      validationSchema={yup.object().shape({
        email: yup.string().email().required(),
        name: yup
          .string()
          .matches(/^[a-zA-Z]+$/, { message: "name must contain only letters" })
          .required(),
      })}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Name*</Text>
          {errors.name && touched.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}
          <TextInput
            style={styles.input}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          <Text style={styles.label}>Email*</Text>
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <TextInput
            style={styles.input}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          <View style={styles.bottomContainer}>
            <Button disabled={!isValid} onPress={handleSubmit}>
              Next
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    flexGrow: 1,
  },
  input: {
    borderColor: "#333",
    borderWidth: 2,
    borderRadius: 4,
    padding: 8,
  },
  label: {
    paddingTop: 12,
    paddingBottom: 4,
    fontFamily: "Karla",
    color: "#333",
    fontSize: 24,
  },
  errorText: {
    paddingBottom: 4,
    fontFamily: "Karla",
    color: "#EE9972",
    fontSize: 16,
  },
  bottomContainer: {
    flexGrow: 1,
    flexDirection: "column-reverse",
  },
});
