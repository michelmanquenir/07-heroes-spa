
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

describe('pruebas en <SearchPage></SearchPage>', () => {

  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrarse correctamente con valores por defecto', () => {

    const { container } = render(

      <MemoryRouter>
        <SearchPage></SearchPage>
      </MemoryRouter>
    )
      /* expect( container ).toMatchSnapshot(); */
  });

  test('de de mostrar a batman y el input con el valor del queryString', () => {

    const { container } = render(

      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage></SearchPage>
      </MemoryRouter>
    )
    const input = screen.getByRole('textbox');
    expect( input.value ).toBe('batman');
  });


  test('debe de mostrar un error si no se encuentra el hero', () => {

    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    )
    const alert = screen.getByLabelText('alert-danger');
    expect( alert.style.display ).toBe('');
  });


  test('debe de llamar el navigate a la pantalla nueva', () => {

    const { container } = render(

      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )
      const input = screen.getByRole('textbox');
      fireEvent.change( input, { target: { name: 'searchText', value: 'superman' }} );

      const form = screen.getByRole('form');
      fireEvent.submit(form);

      expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman');
  });

})