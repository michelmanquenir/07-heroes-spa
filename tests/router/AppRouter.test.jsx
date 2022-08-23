import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { AppRouter } from "../../src/router/AppRouter";


describe('Pruebas en <AppRouter></AppRouter>', () => {

  test('debe de mostrar el login si no esta autenticado', () => {

    const contextValue = {
      logged: false,
    }

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText('Login').length).toBe(2);
  });

  test('debe de mostrar el componente de marvel si esta autenticado', () => {

    const contextValue = {
      logged: true,
      user: {
        id: 'abc',
        name: 'Michel Manquenir'
      }
    }

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
      //espera que marvel aparesca mas de 1 vez
    expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);

  });
})