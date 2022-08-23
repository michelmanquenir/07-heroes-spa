
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { Navbar } from "../../../src/ui/components/Navbar";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));



describe('Pruebas en <NavBar></NavBar>', () => {

  const contextValue = {
    logged: true,
    user: {
      name: 'Michel Manquenir',
    },
    logout: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar el nombre del usuario', () => {

    render(

      <AuthContext.Provider value={ contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Michel Manquenir')).toBeTruthy();
  });


  test('debe de llamar el logout y navigate cuando se hace click en la boton', () => {

    render(

      <AuthContext.Provider value={ contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    const logoutBtn =  screen.getByRole('button');
    fireEvent.click(logoutBtn);

    expect(contextValue.logout).toHaveBeenCalled();
    expect( mockedUseNavigate).toHaveBeenCalledWith('/login', {"replace": true});

    const img = screen.getByRole('img');
    expect(img.src).toBe('/assets/heroes/dc-batman.jpg');

    const alertDanger = screen.getByLabelText('alert-danger');
    expec( alertDanger.style.display ).toBe('none');
  });

})