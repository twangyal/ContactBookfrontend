import { useEffect, useState } from 'react'
import ContactList from './ContactList'
import './App.css'
import ContactForm from './ContactForm'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }
  const closeModal = () =>{
    setIsModalOpen(false)
    setCurrentContact({})
  }
  const openCreateModal = () =>{
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditMdal = (contact) =>{
    if(isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }
  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditMdal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && <div className="modal">
        <div className='modal-content'>
          <button className="close" onClick={closeModal}>x</button>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
        </div>
      </div>
      }  
    </>
  )
}

export default App
