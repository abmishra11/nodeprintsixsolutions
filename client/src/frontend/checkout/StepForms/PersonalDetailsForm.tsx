import TextInput from "../../../common/form-components/TextInput";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "../../../redux/reducer/checkout";
import { User } from "../../../types/user";
import { RootState } from "../../../redux/Store";

type PersonalDetailsFormData = {
  name: string;
  email: string;
  phone: string;
};

interface StepFormProps {
  userData: User;
}

export default function PersonalDetailsForm({ userData }: StepFormProps) {
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );
  console.log("currentStep: ", currentStep);

  const existingFormData = useSelector(
    (state: RootState) => state.checkout.checkoutFormData
  );
  console.log("existingFormData: ", existingFormData);

  const initialValues = {
    name: existingFormData?.name || userData?.name || "",
    email: existingFormData?.email || userData?.email || "",
    phone: existingFormData?.phone || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({ defaultValues: initialValues });

  async function processData(data: PersonalDetailsFormData) {
    // if (userId) {
    //   data.userId = userId;
    //   dispatch(updateCheckoutFormData(data));
    //   dispatch(setCurrentStep(currentStep + 1));
    //   console.log(data);
    // }
    dispatch(updateCheckoutFormData(data));
    dispatch(setCurrentStep(currentStep + 1));
    console.log(data);
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
          register={register}
          errors={errors}
        />
        <TextInput
          label={"Email Address"}
          name={"email"}
          type="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Phone Number"}
          name={"phone"}
          register={register}
          errors={errors}
          className="w-full"
        />
      </div>
      <NavButtons loading={isLoading} />
    </form>
  );
}
