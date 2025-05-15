"use client";
import TextInput from "../../../common/form-components/TextInput";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "../../../redux/reducer/checkout";

export default function PersonalDetailsForm({ userData }) {
  console.log("userData: ", userData);
  
  const userId = userData.userId;
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.checkout.currentStep);
  console.log("currentStep: ", currentStep);
  
  const existingFormData = useSelector(
    (state: RootState) => state.checkout.checkoutFormData
  );
  console.log("existingFormData: ", existingFormData);

  let formData = userData;
  if (existingFormData) {
    const formData = existingFormData;
  }

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: existingFormData?.name || userData?.name || "",
      email: existingFormData?.email || userData?.email || "",
      phone: existingFormData?.phone || userData?.phone || "",
    },
  });

  useEffect(() => {
    if (!existingFormData && userData) {
      reset({
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
      });
    }
  }, [userData.profile, reset, existingFormData]);

  async function processData(data) {
    if (userId) {
      data.userId = userId;
      // Update the checkout data
      dispatch(updateCheckoutFormData(data));
      // Update the current step
      dispatch(setCurrentStep(currentStep + 1));
      console.log(data);
    }
  }
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 text-primary">
        Personal Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label={"Name"}
          name={"name"}
          reset={reset}
          register={register}
          errors={errors}
        />
        <TextInput
          label={"Email Address"}
          name={"email"}
          type="email"
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Phone Number"}
          name={"phone"}
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
      </div>
      <NavButtons />
    </form>
  );
}
