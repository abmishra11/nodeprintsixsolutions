import React, { useEffect, useMemo } from 'react';
import BreadCrumb from '../../common/BreadCrumb';
import CartItems from './CartItems';
import CartSubTotalCard from './CartSubTotalCard';
import EmptyCart from './EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '../../redux/reducer/checkout';
import { RootState } from './redux/store';
import { Container, Grid, Paper } from '@mui/material';
import { useCartItems } from '../../hooks/useCartItems';

export default function Cart(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(1));
  }, [dispatch]);

  const user = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user?.userId;

  const {
    cartItems,
    isCartLoading,
    cartError,
  } = useCartItems(isAuthenticated);
  console.log('cartItems', cartItems);
  
  const subTotal = cartItems
  .reduce((acc, item) => acc + (item.salePrice || 0) * (item.quantity || 0), 0)
  .toFixed(2);
  console.log('subTotal', subTotal);
  const subTotalNumber = Number(subTotal);

  return (
    <Container sx={{ py: 4 }}>
      <BreadCrumb />
      {cartItems.length > 0 ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <CartItems cartItems={cartItems} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper' }}>
              <CartSubTotalCard subTotal={subTotalNumber} />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <EmptyCart />
      )}
    </Container>
  );
}
