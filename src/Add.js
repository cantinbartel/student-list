import React, { useState, useEffect, useRef } from 'react'
import './Edit.css'
import { FiX, FiUpload } from "react-icons/fi"

const courseList = ['Mathematics', 'Science', 'History', 'IT', 'French', 'Chinese', 'Economics', 'Art', 'Geography', 'Music']
const ageArray = Array.from(Array(86).keys()).filter(nb => nb > 4)


const Add = ({ students, setStudents, setNewStudentPage }) => {
    const [name, setName] = useState('')
    const [age, setAge] = useState(18)
    const [imageSrc, setImageSrc] = useState('/noImage.png')
    const [backgroundImageSrc, setbackgroundImageSrc] = useState('/noImage.png')
    const [courses, setCourses] = useState([])
    const [course, setCourse] = useState(courseList[0])
    const [selectError, setSelectError] = useState(null)
    const hiddenFileInput = useRef(null)
    const hiddenFileInput2 = useRef(null)
    const close = () => {
        setNewStudentPage(false)
    }
    const handleClick = () => {
        hiddenFileInput.current.click()
    }
    const handleBackgroundImage = (e) => {
        hiddenFileInput2.current.click()
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setImageSrc(base64)
    }
    const uploadBackgroundImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setbackgroundImageSrc(base64)
    }

    const handleSelect = (e) => {
        e.preventDefault()
        if (courses.includes(course)) {
            setSelectError('course already selected...')
            return
        } else {
            setSelectError(null)
            setCourses([...courses, course])
        }
    }

    const getRandomId = (nb) => Math.floor(Math.random() * nb).toString()

    const handleSubmit = (e) => {
        console.log('submited')
        e.preventDefault()
        const newStudent = { 
            name, 
            age, 
            image: { src: imageSrc }, 
            backgroundImage: { src: backgroundImageSrc }, 
            courses,
            id: getRandomId(1000000),
            created_at: new Date(),
            modified_at: new Date()
        }
        console.log('newStudent', newStudent)
        setStudents([...students, newStudent])
        close()
    }

    return (
        <div className='background'>
            <div className='container'>
                <FiX
                    className='close-btn'
                    onClick={close} />
                <p 
                    style={{ 
                        marginTop: '2rem', 
                        fontSize: '1.5rem',
                        // margin: '5rem 0 2rem 20%' 
                        // marginLeft: '20%',
                        marginTop: '5rem' 
                    }}>Add Student</p>
                    <form onSubmit={handleSubmit}>
                        <div className='personnalInfo'>
                            <div style={{ marginRight: '2rem' }}>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => {
                                        setName(e.target.value);
                                    }} />
                            </div>
                            <div>
                                <label>Age:</label>
                                <select value={age} onChange={(e) => setAge(e.target.value)}>
                                    {ageArray.map((nb) => (
                                        <option key={nb} value={nb}>{nb}</option>
                                    ))}
                                </select>
                                {/* <input
                                    type="text"
                                    value={age}
                                    onChange={e => setAge(e.target.value)} /> */}
                            </div>
                        </div>
                        <div className='pictures'>
                            <div>
                                <label>Picture:</label>
                                <div
                                    className='picture'
                                    style={{
                                        backgroundImage: `url(${imageSrc})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: '6rem',
                                        height: '6rem'
                                    }} />
                                <FiUpload onClick={handleClick} className='upload' />
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={hiddenFileInput}
                                    onChange={uploadImage} />
                            </div>
                            <div>
                                <label>Cover:</label>
                                <div
                                    className='cover'
                                    style={{
                                        backgroundImage: `url(${backgroundImageSrc})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: '12rem',
                                        height: '6rem'
                                    }} />
                                <FiUpload onClick={handleBackgroundImage} className='upload' />
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={hiddenFileInput2}
                                    onChange={uploadBackgroundImage} />
                            </div>
                        </div>
                        <div style={{marginTop: '1rem'}}>
                            <label> Courses:</label>
                            {/* <div className='courses'> */}
                            <div style={{display: 'flex', justifyContent: 'start', alignItems: 'end', marginLeft: '0.3rem', marginTop: '0.5rem'}}>
                                <ul >
                                    {courses.map((c, i) => (
                                        <li key={i}>{c}</li>
                                    ))}
                                </ul>
                                {courses.length < 4 && (
                                    <div style={{marginLeft: '2rem'}}>
                                        <select value={course} onChange={(e) => setCourse(e.target.value)}>
                                            {courseList.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        <button onClick={handleSelect}>Add</button>
                                        {selectError && <p>{selectError}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                        <button style={{marginTop: '1.5rem'}}>Save</button>
                    </form>
            </div>
        </div>
    )
}

export default Add