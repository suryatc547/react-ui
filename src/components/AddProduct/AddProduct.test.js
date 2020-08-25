import React from 'react';
import ReactDOM from 'react-dom';
import AddProduct from './AddProduct';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddProduct />, div);
  ReactDOM.unmountComponentAtNode(div);
});