import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'Yazman Rodriguez',
    email: 'yazmanito@gmail.com',
    github: 'yazmanito'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'leo@gmail.com',
    github: 'leo'
  },
  {
    id: '3',
    name: 'Haakon Dahlberg',
    email: 'haakon@gmail.com',
    github: 'midudev'
  }
]

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE
})()

/* el slice es una porcion del store que esta encargada de un estado,
para este caso, el estado de los usuarios */
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      /* crear un id, esto es nativo de la plataforma */
      const id = crypto.randomUUID()
      /* con Redux Toolkit se puede modificar el estado actual 
      porq por detras crea uno nuevo */
      state.push({ id, ...action.payload })
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
    /* si la peticion para sincronizar con la base de datos ha ido
    mal, haga un rollback al estado anterior */
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(
        (user) => user.id === action.payload.id
      )
      if (!isUserAlreadyDefined) {
        state.push(action.payload)
      }
    }
  }
})

/* exportar el reducer */
export default usersSlice.reducer
/* exportar las acciones */
export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions
