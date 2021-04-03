/*  Probando a renderizar listas de elementos con React
      -Cuando solo tenemos un parámetro en una arrow function, podemos eliminar los paréntesis
      -Cuando el return es lo primero que hay en la arrow function, podemos quitar el return y las llaves, y hacer un return implícito
      -Es necesario añadir una key al componente que renderiza una lista de elementos, para que
      internamente react pueda mantener una referencia a él por temas de eficiencia.
      Tiene que ser un valor que identifique SIEMPRE al mismo objeto, por ejemplo su ID
      Por ejemplo, su posición en el array no valdría, porque al eliminar un objeto del array las posiciones cambian.
*/
import "./App.css"
import {useState} from "react"
import {Note} from "./Note.js"

export default function App(props){
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [isImportant, setIsImportant] = useState(false)

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault() // El evento de submit refresca la página, así se evita que lo haga
    const noteToAdd = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: isImportant
    }

    setNotes([...notes, noteToAdd])
    setNewNote("")
  }

  const handleShowAll = () => {
    setShowAll(!showAll)
  }

  const handleCheckbox = () => {
    setIsImportant(!isImportant)
  }

  return(
    <div>
      <h1>Notas</h1>
      <button class="showAll" onClick={handleShowAll} >{showAll ? "Mostrar importantes" : "Mostrar todas"}</button>
      <ol>
        {notes
          .filter((note) => {
            if(showAll) return true
            return note.important === true
          })
          .map((note) => {
            return(
              <Note key={note.id} content={note.content} date={note.date} /> // Es una buena práctica pasar solo las props necesarias, aunque podría pasar el objeto entero
            )})
        }
      </ol>
      <form onSubmit={handleSubmit} >
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Añadir nota</button>
        <label><input type="checkbox" onChange={handleCheckbox} /> Importante </label>
      </form>
    </div>
  )
}