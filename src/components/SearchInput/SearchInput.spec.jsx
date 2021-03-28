import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchInput } from '.';

describe('<SearchInput />', () => {
  it('should have a value of value', () => {
    const fn = jest.fn();
    render(<SearchInput value="testando" onChange={fn} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input.value).toBe('testando');
  });

  it('should call handleChange function on each key pressed', async () => {
    const fn = jest.fn();
    render(<SearchInput value="" onChange={fn} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'any value';

    userEvent.type(input, value);

    await waitFor(() => {
      expect(input.value).toBe('any value');
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<SearchInput value="" onChange={fn} />);
    expect(container).toMatchSnapshot();
  });
});
