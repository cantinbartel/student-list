import { useState, useLayoutEffect } from 'react'
import { studentList } from './data'
import Students from './components/Students'
import Edit from './Edit'
import Add from './Add'
import './App.css'
import { MdAddCircle } from 'react-icons/md'


const sortOptions = ['age ascending', 'age descending', 'name A to Z', 'name Z to A', 'created date ascending', 'created date descending']

function App() {
  const [students, setStudents] = useState(studentList)
  const [editPage, setEditPage] = useState(false)
  const [newStudentPage, setNewStudentPage] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [sortBy, setSortBy] = useState(sortOptions[4])

  const handleFilter = (e) => {
    setSortBy(e.target.value)
    switch (e.target.value) {
      case 'age ascending':
        setStudents(students.sort((a, b) => a.age - b.age))
        break
      case 'age descending':
        setStudents(students.sort((a, b) => b.age - a.age))
        break
      case 'name Z to A':
        setStudents(students.sort((a, b) => {
          if (a.name > b.name) {return -1;}
          if (a.name < b.name) {return 1;}
          return 0;
        }))
        break
      case 'name A to Z':
        setStudents(students.sort((a, b) => {
          if (a.name < b.name) {return -1;}
          if (a.name > b.name) {return 1;}
          return 0;
        }))
        break
      case 'created date ascending':
        setStudents(students.sort((a, b) => a.created_at - b.created_at))
      break
      case 'created date descending':
        setStudents(students.sort((a, b) => b.created_at - a.created_at))
      break
    }
  }

  return (
    <div className='main-container'>
      <h1 style={{textAlign: 'center', margin: '5rem 0 2rem 0'}}>Student List</h1>
      <MdAddCircle 
        className='add-student'
        onClick={() => setNewStudentPage(true)}/>
      <div className='filter'>
        <label>Filter by:</label>
        <select value={sortBy} onChange={handleFilter}>
          {sortOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
        </select>
      </div>
      <Students
        students={students}
        setStudents={setStudents}
        setEditPage={setEditPage}
        setSelectedStudent={setSelectedStudent} />
      {editPage && (
        <Edit
          editPage={editPage}
          setEditPage={setEditPage}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          students={students}
          setStudents={setStudents} />
      )}
      {newStudentPage && (
        <Add
          newStudentPage={newStudentPage}
          setNewStudentPage={setNewStudentPage}
          students={students}
          setStudents={setStudents} />
      )}
    </div>
  );
}

export default App
