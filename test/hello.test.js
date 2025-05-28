import { render, screen } from '@testing-library/react';
import Hello from '../src/components/hello';
import React from 'react';


test('renders hello message', () => {
  render(<Hello />);
  const helloElement = screen.getByText(/Hello, World!/i);
  expect(helloElement).toBeInTheDocument();
});
