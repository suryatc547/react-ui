import React, { lazy, Suspense } from 'react';

const LazyAddProduct = lazy(() => import('./AddProduct'));

const AddProduct = props => (
  <Suspense fallback={null}>
    <LazyAddProduct {...props} />
  </Suspense>
);

export default AddProduct;
