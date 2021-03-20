import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchInput } from '.';

describe('<SearchInput />', () => {
  it('should have a value of value', () => {
    const fn = jest.fn();
    render(<SearchInput value={'testando'} onChange={fn} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input.value).toBe('testando');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<SearchInput onChange={fn} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'any value';

    userEvent.type(input, value);

    setTimeout(() => {
      expect(input.value).toBe(value);
      expect(fn).toHaveBeenCalledTimes(1);
    }, 500);
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    const { container } = render(<SearchInput onChange={fn} />);
    expect(container).toMatchSnapshot();
  });
});