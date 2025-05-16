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

const states = [
  /* same states as your original code */
];
const countries = [
  { id: "Canada", title: "Canada" },
  { id: "United States", title: "United States" },
];

export default function ShippingDetailsForm({ addresses }) {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.checkout.currentStep);
  const existingFormData = useSelector(
    (state: RootState) => state.checkout.checkoutFormData
  );
  console.log("existingFormData", existingFormData);
  
  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();
  
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [shippingCost, setShippingCost] = useState(
    existingFormData?.shippingCost || ""
  );
  const [shippingCostError, setShippingCostError] = useState(false);

  useEffect(() => {
    if (existingFormData?.shippingAddress) {
      setSelectedAddress(existingFormData.shippingAddress);
    } else {
      const defaultAddr = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddr || {});
    }
  }, [addresses, existingFormData]);

  console.log("selectedAddress", selectedAddress);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: selectedAddress,
  });

  useEffect(() => {
    if (!isAddingNewAddress && selectedAddress) {
      reset(selectedAddress);
    }
  }, [selectedAddress, isAddingNewAddress, reset]);

  const onSubmit = async (data) => {
    if (!shippingCost) {
      setShippingCostError(true);
      return;
    }
    setShippingCostError(false);

    let shippingAddress = data;
    let shippingAddressId = selectedAddress.shippingAddressId;

    if (!data.shippingAddressId) {
      try {
        const res = await addAddress({
          ...data,
          defaultBilling: false,
          defaultShipping: false,
        }).unwrap();

        shippingAddress = res[0];
        shippingAddressId = res[0].id;
      } catch (err) {
        console.error("Address creation failed:", err);
        return;
      }
    }

    dispatch(
      updateCheckoutFormData({
        shippingAddress: {
          ...shippingAddress,
          shippingAddressId,
        },
        newAddedAddresses: data.shippingAddressId ? [] : [shippingAddress],
        shippingCost,
      })
    );
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
                {addr.streetAddress1} {addr.streetAddress2}, {addr.city},{" "}
                {addr.state}, {addr.zipcode}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            onClick={() => {
              setIsAddingNewAddress(true);
              reset({});
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
          <Grid item xs={12} sm={4}>
            <TextField
              label="City"
              fullWidth
              {...register("city", { required: "Required" })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="State"
              select
              fullWidth
              {...register("state", { required: "Required" })}
              error={!!errors.state}
              helperText={errors.state?.message}
            >
              {states.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Zip Code"
              fullWidth
              {...register("zipcode", { required: "Required" })}
              error={!!errors.zipcode}
              helperText={errors.zipcode?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              select
              fullWidth
              {...register("country", { required: "Required" })}
              error={!!errors.country}
              helperText={errors.country?.message}
            >
              {countries.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.title}
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
            onChange={(e) => setShippingCost(e.target.value)}
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
              value="20"
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
