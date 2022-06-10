import React from 'react'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'

const Student = ({ student, students, setStudents, setEditPage, setSelectedStudent }) => {
    console.log(student.image.src)
    return (
        <div className='profile-card'>
            <div
                className='profile-background-picture'
                style={{
                    backgroundImage: `url(${student.backgroundImage.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '30%',
                    width: '100%'
                }} />
            <div
                className='profile-picture'
                style={{
                    backgroundImage: `url(${student.image.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
            <div className='personnal-info'>
                <p className='name'>{student.name}</p>
                <p className='age'>{student.age}</p>
                <div className='courses'>
                    <>
                        {student.courses.map((course, i) => (
                            <span
                                key={i}
                                className='capsule'>{course}</span>
                        ))}
                    </>
                </div>
                <div className='modify-student'>
                    <FaEdit
                        className='edit-btn'
                        style={{ marginRight: '1rem' }}
                        onClick={() => { setEditPage(true); setSelectedStudent(student) }} />
                    <FaTrashAlt
                        className='delete-btn'
                        onClick={() => setStudents(students.filter(std => std.id != student.id))} />
                </div>
            </div>
        </div>
    )
}



const Students = ({ students, setStudents, setEditPage, setSelectedStudent }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '80%',
                margin: '0 auto'
            }}>
            {students.length == 0 && <p style={{
                textAlign: 'center',
                marginTop: '5rem',
                fontSize: '2rem'
            }}>No students left</p>}
            {students.map((student, i) => {
                return (
                    <Student
                        key={i}
                        student={student}
                        students={students}
                        setStudents={setStudents}
                        setEditPage={setEditPage}
                        setSelectedStudent={setSelectedStudent} />
                )
            })}
        </div>
    )
}

export default Students