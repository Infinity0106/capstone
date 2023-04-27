import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaskedTextInput } from "react-native-mask-text";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";

import { Button } from "./Button";

interface ProfielFormInitialValues {
  avatar: string;
  email: string;
  name: string;
  lastName: string;
  phone: string;
  orderStatus: boolean;
  passwordChange: boolean;
  specialOffer: boolean;
  newsLetter: boolean;
}

type ProfileFormProps = {
  onSubmit: (values: ProfielFormInitialValues) => void;
  onLogOut: () => void;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  onLogOut,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [initValues, setInitValues] = useState<ProfielFormInitialValues>({
    avatar: "",
    email: "",
    name: "",
    lastName: "",
    phone: "",
    orderStatus: false,
    passwordChange: false,
    specialOffer: false,
    newsLetter: false,
  });

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);

        setInitValues({
          avatar: parsedUser.avatar ?? initValues.avatar,
          email: parsedUser.email ?? initValues.email,
          name: parsedUser.name ?? initValues.name,
          lastName: parsedUser.lastName ?? initValues.lastName,
          phone: parsedUser.phone ?? initValues.phone,
          orderStatus: parsedUser.orderStatus ?? initValues.orderStatus,
          passwordChange:
            parsedUser.passwordChange ?? initValues.passwordChange,
          specialOffer: parsedUser.specialOffer ?? initValues.specialOffer,
          newsLetter: parsedUser.newsLetter ?? initValues.newsLetter,
        });
      }
      setIsLoading(false);
    })();
  }, []);

  const pickImage = useCallback(
    (setFieldValue, fieldName) => async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        allowsMultipleSelection: false,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled) {
        setFieldValue(fieldName, result.assets[0].uri);
      }
    },
    []
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Formik
      initialValues={initValues}
      onSubmit={onSubmit}
      validationSchema={yup.object().shape({
        avatar: yup.string(),
        email: yup.string().email().required(),
        name: yup
          .string()
          .matches(/^[a-zA-Z]+$/, { message: "name must contain only letters" })
          .required(),
        lastName: yup.string().matches(/^[a-zA-Z]+$/, {
          message: "last name must contain only letters",
        }),
        phone: yup
          .string()
          .matches(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, {
            message: "phone number must be a US",
          }),
        orderStatus: yup.boolean(),
        passwordChange: yup.boolean(),
        specialOffer: yup.boolean(),
        newsLetter: yup.boolean(),
      })}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        setFieldValue,
        values,
        isValid,
        errors,
        touched,
      }) => (
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 10,
              fontFamily: "Karla",
            }}
          >
            Personal Information
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                borderRadius: 100,
                height: 64,
                width: 64,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#495E57",
              }}
            >
              {values.avatar ? (
                <Image
                  source={{ uri: values.avatar }}
                  style={{ width: 64, height: 64, borderRadius: 32 }}
                />
              ) : (
                <Text
                  style={{ color: "white", fontSize: 36, textAlign: "center" }}
                >
                  {(values.name[0] ?? "").toLocaleUpperCase()}
                  {(values.lastName[0] ?? "").toLocaleUpperCase()}
                </Text>
              )}
            </View>
            <Pressable
              style={{
                marginLeft: 24,
                borderRadius: 10,
                borderColor: "#495E57",
                borderWidth: 2,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={pickImage(setFieldValue, "avatar")}
            >
              <Text style={{ color: "#495E57", fontSize: 16 }}>change</Text>
            </Pressable>
            <Pressable
              style={{
                marginLeft: 24,
                borderRadius: 10,
                borderColor: "#495E57",
                borderWidth: 2,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setFieldValue("avatar", "")}
            >
              <Text style={{ color: "#495E57", fontSize: 16 }}>remove</Text>
            </Pressable>
          </View>
          <Text style={styles.label}>First name</Text>
          {errors.name && touched.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}
          <TextInput
            style={styles.input}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          <Text style={styles.label}>Last name</Text>
          {errors.lastName && touched.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
          <TextInput
            style={styles.input}
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            value={values.lastName}
          />
          <Text style={styles.label}>Email</Text>
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <TextInput
            style={styles.input}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Phone number</Text>
          {errors.phone && touched.phone && (
            <Text style={styles.errorText}>{errors.phone}</Text>
          )}
          <MaskedTextInput
            mask="(999) 999-9999"
            style={styles.input}
            onChangeText={handleChange("phone")}
            onBlur={handleBlur("phone")}
            placeholder="(123) 456-7890"
            keyboardType="phone-pad"
            value={values.phone}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 10,
              fontFamily: "Karla",
            }}
          >
            Email notifications
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              style={{ marginVertical: 8, marginRight: 8 }}
              color="#495E57"
              value={values.orderStatus}
              onValueChange={(val) => setFieldValue("orderStatus", val)}
            />
            <Text style={{ fontSize: 16, fontFamily: "Karla" }}>
              Order statuses
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              style={{ marginVertical: 8, marginRight: 8 }}
              color="#495E57"
              value={values.passwordChange}
              onValueChange={(val) => setFieldValue("passwordChange", val)}
            />
            <Text style={{ fontSize: 16, fontFamily: "Karla" }}>
              Password changes
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              style={{ marginVertical: 8, marginRight: 8 }}
              color="#495E57"
              value={values.specialOffer}
              onValueChange={(val) => setFieldValue("specialOffer", val)}
            />
            <Text style={{ fontSize: 16, fontFamily: "Karla" }}>
              Special offers
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              style={{ marginVertical: 8, marginRight: 8 }}
              color="#495E57"
              value={values.newsLetter}
              onValueChange={(val) => setFieldValue("newsLetter", val)}
            />
            <Text style={{ fontSize: 16, fontFamily: "Karla" }}>
              Newsletter
            </Text>
          </View>

          <View style={styles.bottomContainer}>
            <Button onPress={onLogOut}>Log out</Button>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                paddingBottom: 24,
              }}
            >
              <Button onPress={handleReset}>Discard Changes</Button>
              <Button disabled={!isValid} onPress={handleSubmit}>
                Save Changes
              </Button>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 16,
  },
  errorText: {
    paddingBottom: 4,
    fontFamily: "Karla",
    color: "#EE9972",
    fontSize: 16,
  },
  bottomContainer: {
    marginTop: 16,
    flexGrow: 1,
    flexDirection: "column-reverse",
  },
});
