import { configureStore, type Middleware } from '@reduxjs/toolkit'
import usersReducer, { rollbackUser } from './users/slice'
import { toast } from 'sonner'

/* middleware se interpone en medio del flujo de la informacion
para agregar logica en ciertos puntos, podriamos hacer logica justo 
antes y justo despues de que se actualice el estado, antes y 
despues del next() respectivamente.
next() sirve para decirle que continue con la accion */
const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action)
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
  }

const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type, payload } = action
    const previousState = store.getState()
    next(action)

    if (type === 'users/deleteUserById') {
      // <- eliminado un usuario
      const userIdToRemove = payload
      const userToRemove = previousState.users.find(
        (user) => user.id === userIdToRemove
      )

      fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
        method: 'DELETE'
      })
        .then((res) => {
          // if (res.ok) {
          // 	toast.success(`Usuario ${payload} eliminado correctamente`)
          // }
          throw new Error('Error al eliminar el usuario')
        })
        .catch((err) => {
          toast.error(`Error deleting user ${userIdToRemove}`)
          if (userToRemove) store.dispatch(rollbackUser(userToRemove))
          console.log(err)
          console.log('error')
        })
    }
  }

/* el store es la caja que va a gestionar los estados.
el slice es una porcion de esa caja que esta encargada de un estado,
para este caso, el estado de los usuarios.
Podria seguir añadiendo slices para lo que necesite, como posts, albums, etc */
export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware]
})

/* tipar los distintos metodos de Redux, para usar Typescript con Redux.
ReturnType, para devolver el tipo que devuelve la función */
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
