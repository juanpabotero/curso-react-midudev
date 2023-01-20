import { useState } from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true,
  },
  {
    userName: 'pheralb',
    name: 'Pablo H.',
    isFollowing: false
  },
  {
    userName: 'PacoHdezs',
    name: 'Paco Hdez',
    isFollowing: true
  },
  {
    userName: 'TMChein',
    name: 'Tomas',
    isFollowing: false
  }
]

function App() {
  const [state, setState] = useState(0)
  /* Cuando renderizamos una lista de elementos o un array se debe agregar el  
  atributo key y debe ser un identificador unico para ese elemento */
  return (
    <section className="App">
      {
        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name} {/* <-- este seria el children */}
          </TwitterFollowCard>
        ))
      }
      <button onClick={() => setState(state + 1)}>count</button>
    </section>
  )
}

export default App
