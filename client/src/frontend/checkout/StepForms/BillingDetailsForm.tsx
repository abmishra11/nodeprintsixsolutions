import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "../../../redux/reducer/checkout";
import TextInput from "../components/forminputs/TextInput";
import SelectInput from "../components/forminputs/SelectInput";
import NavButtons from "../components/NavButtons";
import { useAddAddressMutation } from "../../../redux/services/address"; // RTK Query
import {
  Button,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const BillingDetailsForm = ({ addresses }) => {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const existingFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );

  const [addAddress] = useAddAddressMutation();

  const newAddedAddresses = existingFormData?.newAddedAddresses || [];

  const currentAddresses =
    newAddedAddresses.length === 0 ? addresses : newAddedAddresses;

  let defaultBillingAddress = {};
  if (currentAddresses.length > 0) {
    defaultBillingAddress = currentAddresses.find(
      (address) => address.defaultBilling
    );
  }

  const countries = [
    { id: "Canada", title: "Canada" },
    { id: "United States", title: "United States" },
  ];
  const states = [
    { id: "Alberta", title: "Alberta" },
    { id: "British Columbia", title: "British Columbia" },
    { id: "Manitoba", title: "Manitoba" },
    { id: "Newfoundland and Labrador", title: "Newfoundland and Labrador" },
    { id: "Northwest Territories", title: "Northwest Territories" },
    { id: "Nova Scotia", title: "Nova Scotia" },
    { id: "Nunavut", title: "Nunavut" },
    { id: "Ontario", title: "Ontario" },
    { id: "Prince Edward Island", title: "Prince Edward Island" },
    { id: "Quebec", title: "Quebec" },
    { id: "Saskatchewan", title: "Saskatchewan" },
    { id: "Yukon Territory", title: "Yukon Territory" },
  ];

  const selectedBillingAddress = existingFormData.billingAddress || {
    billingAddressId: defaultBillingAddress?.id,
    streetAddress1: defaultBillingAddress?.streetAddress1 || "",
    streetAddress2: defaultBillingAddress?.streetAddress2 || "",
    city: defaultBillingAddress?.city || "",
    state: defaultBillingAddress?.state || "",
    zipcode: defaultBillingAddress?.zipcode || "",
    country: defaultBillingAddress?.country || "",
  };

  const [selectedAddress, setSelectedAddress] = useState(
    selectedBillingAddress
  );
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: selectedBillingAddress });

  useEffect(() => {
    if (!isAddingNewAddress) {
      reset(selectedAddress);
    }
  }, [selectedAddress, reset, isAddingNewAddress]);

  const processData = async (data) => {
    let billingFormData = {};

    if (!data.billingAddressId) {
      try {
        const newAddress = {
          userId: existingFormData?.userId,
          streetAddress1: data.streetAddress1,
          streetAddress2: data.streetAddress2,
          city: data.city,
          state: data.state,
          zipcode: data.zipcode,
          country: data.country,
          defaultBilling: false,
          defaultShipping: false,
        };

        const response = await addAddress(newAddress).unwrap();
        const newAddressId = response?.id;

        billingFormData = {
          billingAddress: { ...newAddress, billingAddressId: newAddressId },
        };
      } catch (err) {
        console.error("Address creation failed", err);
      }
    } else {
      billingFormData = {
        billingAddress: {
          billingAddressId: selectedAddress.billingAddressId,
          streetAddress1: data.streetAddress1,
          streetAddress2: data.streetAddress2,
          city: data.city,
          state: data.state,
          zipcode: data.zipcode,
          country: data.country,
        },
      };
    }

    dispatch(updateCheckoutFormData(billingFormData));
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <div className="container my-4">
      {!isAddingNewAddress && currentAddresses.length > 0 && (
        <Grid container spacing={2} alignItems="center" className="mb-3">
          <Grid item xs={12} md={8}>
            <FormControl fullWidth>
              <InputLabel id="billing-select-label">
                Select Billing Address
              </InputLabel>
              <Select
                labelId="billing-select-label"
                value={selectedAddress?.billingAddressId || ""}
                onChange={(e) => {
                  const addr = currentAddresses.find(
                    (a) => a.id === e.target.value
                  );
                  setSelectedAddress({
                    billingAddressId: addr.id,
                    streetAddress1: addr.streetAddress1,
                    streetAddress2: addr.streetAddress2,
                    city: addr.city,
                    state: addr.state,
                    zipcode: addr.zipcode,
                    country: addr.country,
                  });
                }}
              >
                {currentAddresses.map((addr) => (
                  <MenuItem key={addr.id} value={addr.id}>
                    {addr.streetAddress1} {addr.streetAddress2}, {addr.city},{" "}
                    {addr.state}, {addr.zipcode}, {addr.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              onClick={() => {
                setIsAddingNewAddress(true);
                reset({
                  billingAddressId: "",
                  streetAddress1: "",
                  streetAddress2: "",
                  city: "",
                  state: "",
                  zipcode: "",
                  country: "",
                });
              }}
            >
              Add New Address
            </Button>
          </Grid>
        </Grid>
      )}

      {isAddingNewAddress && (
        <Button
          variant="outlined"
          fullWidth
          className="mb-3"
          onClick={() => {
            setIsAddingNewAddress(false);
            reset(selectedAddress);
          }}
        >
          Select From Saved Addresses
        </Button>
      )}

      <form onSubmit={handleSubmit(processData)}>
        <Typography variant="h6" gutterBottom>
          Billing Address
        </Typography>
        <Grid container spacing={3}>
          <TextInput
            label="Location"
            name="streetAddress1"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Unit # if any"
            name="streetAddress2"
            register={register}
            errors={errors}
          />
          <TextInput
            label="City"
            name="city"
            register={register}
            errors={errors}
          />
          <SelectInput
            label="State/Province"
            name="state"
            options={states}
            register={register}
          />
          <SelectInput
            label="Country"
            name="country"
            options={countries}
            register={register}
          />
          <TextInput
            label="Zip Code"
            name="zipcode"
            register={register}
            errors={errors}
          />
        </Grid>
        <NavButtons />
      </form>
    </div>
  );
};

export default BillingDetailsForm;
