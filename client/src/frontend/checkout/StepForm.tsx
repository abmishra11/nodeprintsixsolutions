import React from "react";
import { useSelector } from "react-redux";
import PersonalDetailsForm from "./StepForms/PersonalDetailsForm";
import ShippingDetailsForm from "./StepForms/ShippingDetailsForm";
import BillingDetailsForm from "./StepForms/BillingDetailsForm";
import PaymentMethodForm from "./StepForms/PaymentMethodForm";
import OrderSummary from "./StepForms/OrderSummary";

export default function StepForm({ addresses, userData }) {
  const currentStep = useSelector((store) => store.checkout.currentStep);

  function renderFormByStep(step) {
    switch (step) {
      case 1:
        return <PersonalDetailsForm userData={userData} />;
      case 2:
        return <ShippingDetailsForm addresses={addresses} />;
      case 3:
        return <BillingDetailsForm addresses={addresses} />;
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
