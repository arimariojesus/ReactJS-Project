import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img2',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render shearch, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Nenhum post encontrado :(');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);

    const button = screen.getByRole('button', { name: /Load more/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Nenhum post encontrado :(');

    // expect.assertions(10);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Type your search/i);

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();

    userEvent.type(search, 'title1');

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();
    });

    userEvent.clear(search);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();
    });

    userEvent.type(search, 'post does not exist');

    await waitFor(() => {
      expect(screen.getByText('Nenhum post encontrado :(')).toBeInTheDocument();
    });
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Nenhum post encontrado :(');

    // expect.assertions(10);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /Load more/i });
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(button).toBeDisabled();
  });
});
