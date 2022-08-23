import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Pruebas en el PrivateRoute', () => {

  test('debe de mostrar el children si esta autenticado', () => {

    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: 'abcx',
        name: 'Michel Manquenir'
      }
    }

    render(
    <AuthContext.Provider value={ contextValue}>
      <MemoryRouter initialEntries={['/batman']}>
        <PrivateRoute >
          <h1>Ruta publica</h1>
        </PrivateRoute>
      </MemoryRouter>
    </AuthContext.Provider>
    )

    expect(screen.getByText('Ruta publica')).toBeTruthy();
    expect( localStorage.setItem).toHaveBeenCalledWith("lastPath", "/batman");
  });

})