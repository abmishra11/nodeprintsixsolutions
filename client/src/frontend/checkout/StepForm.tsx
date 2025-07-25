import React from "react";
import { useSelector } from "react-redux";
import PersonalDetailsForm from "./StepForms/PersonalDetailsForm";
import ShippingDetailsForm from "./StepForms/ShippingDetailsForm";
import BillingDetailsForm from "./StepForms/BillingDetailsForm";
import PaymentMethodForm from "./StepForms/PaymentMethodForm";
import OrderSummary from "./StepForms/OrderSummary";
import { RootState } from "../../redux/Store";
import { Address } from "../../types/address";
import { User } from "../../types/user";

interface StepFormProps {
  userData: User;
}

export default function StepForm({ userData }: StepFormProps) {
  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );

  function renderFormByStep(step: number) {
    switch (step) {
      case 1:
        return <PersonalDetailsForm userData={userData} />;
      case 2:
        return <ShippingDetailsForm />;
      case 3:
        return <BillingDetailsForm addresses={userData?.addresses} />;
      case 4:
        return <PaymentMethodForm />;
      case 5:
        return <OrderSummary />;
      default:
        return null;
    }
  }

  return <div>{renderFormByStep(currentStep)}</div>;
}
