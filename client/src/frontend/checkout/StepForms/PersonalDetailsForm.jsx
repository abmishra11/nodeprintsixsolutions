"use client";
import TextInput from "@/components/forminputs/TextInput";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "@/redux/slices/checkoutSlice";

export default function PersonalDetailsForm({ userData }) {
  const userId = userData.id;
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const existingFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );

  let formData = userData?.profile;
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
      name: existingFormData?.name || userData?.profile?.name || "",
      email: existingFormData?.email || userData?.profile?.email || "",
      phone: existingFormData?.phone || userData?.profile?.phone || "",
    },
  });

  // Populate form with session data on first load if there's no existing data
  useEffect(() => {
    if (!existingFormData && userData) {
      reset({
        name: userData?.profile?.name || "",
        email: userData?.profile?.email || "",
        phone: userData?.profile?.phone || "",
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
