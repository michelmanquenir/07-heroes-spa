import { authReducer, types } from "../../../src/auth";


describe('Pruebas en authReducer', () => {

  test('should debe de retornar el estado por defecto', () => {

    const state = authReducer({ logged: false}, {});

    expect(state).toEqual({ logged: false });

   })


  test('de de (login) llamar el login autentificar y establecer el login', () => {

    const action = {
      type: types.login,
      payload: {
        name: 'Michel',
        id: '123'
      }
    }

    const state = authReducer({ logged: false}, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload
    });
  });

  test('debe de borrar el name del usuario y el logged en false', () => {

    const initialState = {
      logged: true,
      user: { id: '123', name: 'Michel'
      }
    }

    const action = {
      type: types.logout,
    }
    const newState = authReducer( initialState, action );

    expect(newState).toEqual({ logged: false});
  });

 })