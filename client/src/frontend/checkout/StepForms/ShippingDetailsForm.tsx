import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Grid,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "../../../redux/reducer/checkout";
import { useAddAddressMutation } from "../../../redux/services/address";
import NavButtons from "../NavButtons";
import { useGetAllCountriesQuery } from "../../../redux/services/countries";
import { useGetStatesByCountryIdQuery } from "../../../redux/services/states";
import { RootState } from "../../../redux/Store";
import { ShippingAddress } from "../../../types/shippingaddress";
import { useGetUserDetailsQuery } from "../../../redux/services/users";

export default function ShippingDetailsForm() {
  const {
    data: userData,
    isLoading: loadingUserData,
    isError,
    error,
    refetch,
  } = useGetUserDetailsQuery();

  console.log("user: ", userData?.user);

  const addresses = userData?.user?.addresses;

  console.log("addresses", addresses);

  const [countryId, setCountryId] = useState("");
  const { data: countries = [] } = useGetAllCountriesQuery();
  const { data: states = [] } = useGetStatesByCountryIdQuery(countryId);

  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );
  const existingFormData = useSelector(
    (state: RootState) => state.checkout.checkoutFormData
  );
  console.log("existingFormData:", existingFormData);

  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<
    Partial<ShippingAddress>
  >({});
  const [shippingCost, setShippingCost] = useState(
    existingFormData?.shippingCost || 0
  );
  const [shippingCostError, setShippingCostError] = useState(false);

  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();

  useEffect(() => {
    if (existingFormData?.shippingAddress) {
      setSelectedAddress(existingFormData.shippingAddress);
    } else {
      const defaultAddr = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddr || {});
    }
  }, [addresses, existingFormData]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ShippingAddress>();

  const watchedCountry = watch("country");
  const watchedState = watch("state");

  useEffect(() => {
    if (selectedAddress) {
      reset(selectedAddress);
      if (selectedAddress.country) {
        setValue("country", selectedAddress.country);
      }
      if (selectedAddress.state) {
        setValue("state", selectedAddress.state);
      }
    }
  }, [selectedAddress, reset, setValue]);

  useEffect(() => {
    const selected = countries.find((c) => c.name === watchedCountry);
    if (selected) {
      setCountryId(selected._id);
    }
  }, [watchedCountry, countries]);

  useEffect(() => {
    if (!isAddingNewAddress && selectedAddress) {
      reset(selectedAddress);
    }
  }, [selectedAddress, isAddingNewAddress, reset]);

  useEffect(() => {
    if (selectedAddress?.country && countries.length > 0) {
      const country = countries.find((c) => c.name === selectedAddress.country);
      if (country) setCountryId(country._id);
    }
  }, [selectedAddress, countries]);

  console.log("selectedAddress: ", selectedAddress);

  const onSubmit = async (data: ShippingAddress) => {
    console.log("data", data);

    if (!shippingCost) {
      setShippingCostError(true);
      return;
    }
    setShippingCostError(false);

    let shippingAddressId = selectedAddress?.shippingAddressId;

    if (isAddingNewAddress || !shippingAddressId) {
      const addressResult = await addAddress({
        ...data,
        fullName: existingFormData?.name,
        phone: existingFormData?.phone,
        defaultBilling: false,
        defaultShipping: false,
      }).unwrap();
      shippingAddressId = addressResult?.addresses[0]._id;
    }

    await refetch();

    dispatch(
      updateCheckoutFormData({
        shippingAddress: {
          ...data,
          fullName: existingFormData?.name,
          phone: existingFormData?.phone,
          shippingAddressId,
        },
        newAddedAddresses: shippingAddressId ? [] : [shippingAddress],
        shippingCost,
      })
    );
    console.log("Inner Current Step: ", currentStep);

    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <Paper className="p-4">
      <Typography variant="h6" gutterBottom>
        Shipping Details
      </Typography>

      {/* Address Selection */}
      {!isAddingNewAddress && addresses.length > 0 && (
        <div className="mb-3">
          <TextField
            fullWidth
            select
            label="Select Shipping Address"
            value={selectedAddress?._id || ""}
            onChange={(e) => {
              const selected = addresses.find(
                (addr) => addr._id === e.target.value
              );
              setSelectedAddress({
                ...selected,
                shippingAddressId: selected._id,
              });
            }}
          >
            {addresses.map((addr) => (
              <MenuItem key={addr._id} value={addr._id}>
                {addr.address1} {addr.address2}, {addr.city},{addr.state},{" "}
                {addr.postalCode}, {addr.country}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            onClick={() => {
              setIsAddingNewAddress(true);
              setSelectedAddress({});
              reset({
                address1: "",
                address2: "",
                country: "",
                state: "",
                city: "",
                postalCode: "",
              });
              setCountryId("");
              setShippingCost(0);
              setShippingCostError(false);
            }}
            className="mt-2"
          >
            Add New Address
          </Button>
        </div>
      )}

      {isAddingNewAddress && (
        <Button
          variant="outlined"
          onClick={() => {
            setIsAddingNewAddress(false);
            reset(selectedAddress);
          }}
          className="mb-3"
        >
          Use Existing Address
        </Button>
      )}

      {/* Address Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address Line 1"
              fullWidth
              {...register("address1", { required: "Required" })}
              error={!!errors.address1}
              helperText={errors.address1?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address Line 2"
              fullWidth
              {...register("address2", { required: "Required" })}
              error={!!errors.address2}
              helperText={errors.address2?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              fullWidth
              {...register("city", { required: "Required" })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal Code"
              fullWidth
              {...register("postalCode", { required: "Required" })}
              error={!!errors.postalCode}
              helperText={errors.postalCode?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              select
              fullWidth
              {...register("country", { required: "Required" })}
              value={watchedCountry || ""}
              onChange={(e) => {
                const name = e.target.value;
                setValue("country", name);
                const id = countries.find((c) => c.name === name)?._id;
                if (id) setCountryId(id);
              }}
              error={!!errors.country}
              helperText={errors.country?.message}
            >
              {countries.map((c) => (
                <MenuItem key={c._id} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              select
              fullWidth
              {...register("state", { required: "Required" })}
              value={watchedState || ""}
              onChange={(e) => setValue("state", e.target.value)}
              error={!!errors.state}
              helperText={errors.state?.message}
            >
              {states.map((s) => (
                <MenuItem key={s._id} value={s.name}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Shipping Cost */}
        <FormControl component="fieldset" className="mt-4">
          <FormLabel component="legend">Shipping Cost</FormLabel>
          <RadioGroup
            row
            name="shippingCost"
            value={shippingCost}
            onChange={(e) => setShippingCost(Number(e.target.value))}
          >
            <FormControlLabel
              value="8"
              control={<Radio />}
              label={
                <span>
                  <LocalShippingIcon /> UPS - $8
                </span>
              }
            />
            <FormControlLabel
              value="16"
              control={<Radio />}
              label={
                <span>
                  <LocalShippingIcon /> UPS - $16
                </span>
              }
            />
          </RadioGroup>
          {shippingCostError && (
            <Typography color="error">Please select a shipping cost</Typography>
          )}
        </FormControl>

        <div className="mt-4">
          <NavButtons loading={isAdding} />
        </div>
      </form>
    </Paper>
  );
}
