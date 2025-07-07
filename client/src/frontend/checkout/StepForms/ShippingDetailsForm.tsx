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
import { State } from "../../../types/state";
import { useGetStatesByCountryIdQuery } from "../../../redux/services/states";

export default function ShippingDetailsForm({ addresses }) {
  console.log("addresses", addresses);
  
  const [ countryId, setCountryId] = useState('');
  const { data: countries = [] } = useGetAllCountriesQuery();
  const { data: states = [] } = useGetStatesByCountryIdQuery(countryId);
  
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.checkout.currentStep);
  const existingFormData = useSelector(
    (state: RootState) => state.checkout.checkoutFormData
  );
  
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [shippingCost, setShippingCost] = useState(
    existingFormData?.shippingCost || ""
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
    formState: { errors },
  } = useForm({
    defaultValues: selectedAddress,
  });

  useEffect(() => {
    if (!isAddingNewAddress && selectedAddress) {
      reset(selectedAddress);
    }
  }, [selectedAddress, isAddingNewAddress, reset]);

  console.log("selectedAddress: ", selectedAddress);
  
  const onSubmit = async (data) => {
    data.fullName = existingFormData?.name;
    data.phone = existingFormData?.phone;
    console.log("data", data);
    
    if (!shippingCost) {
      setShippingCostError(true);
      return;
    }
    setShippingCostError(false);

    let shippingAddress = data;
    let shippingAddressId = selectedAddress?.shippingAddressId;

    if (!data.shippingAddressId) {
        const addressResult = await addAddress({
          ...data,
          defaultBilling: false,
          defaultShipping: false,
        }).unwrap();
        console.log("Address Result: ", addressResult);
        shippingAddress = addressResult?.addresses[0];
        shippingAddressId = addressResult?.addresses[0]._id;
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
                {addr.address1} {addr.address2}, {addr.city},
                {addr.state}, {addr.postalCode}, {addr.country}
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              select
              fullWidth
              {...register("country", { required: "Required" })}
              error={!!errors.country}
              helperText={errors.country?.message}
              onChange={(e) => {
                const name = e.target.value;
                const id   = countries.find(c => c.name === name)?._id;
                setCountryId(id);
                fieldOnChange(e);
              }}
            >
              {countries.map((c) => (
                <MenuItem key={c._id} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
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
                <MenuItem key={s._id} value={s.name}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>
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
              label="Postal Code"
              fullWidth
              {...register("postalCode", { required: "Required" })}
              error={!!errors.postalCode}
              helperText={errors.postalCode?.message}
            />
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
