import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { makeid } from '../utils';
const Tlist = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [allTodos, setTodos] = useState([]);
    const [doingTodo, setDoingTodo] = useState([]);
    const [doneTodo, setDoneTodo] = useState([]);
    const [temp, setTemp] = useState([]);
    const handlechange = (e) => {
        const { name, value } = e.target
        if (name === "newTitle") {
            setNewTitle(value)
        } else {
            setNewDescription(value)
        }
    }
    const blank = (e) => {
        setNewTitle("");
        setNewDescription("");
    }
    const handleAddTodo = () => {
        let newTodoItem = {
            id: makeid(10),
            title: newTitle,
            description: newDescription
        }
        console.log(newTodoItem);
        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem);
        setTodos(updatedTodoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
    }
    useEffect(() => {
        let saveTodolist = JSON.parse(localStorage.getItem('todolist'));
        if (saveTodolist) {
            setTodos(saveTodolist);
        }
        let savedoinglist = JSON.parse(localStorage.getItem('doinglist'));
        if (savedoinglist) {
            setDoingTodo(savedoinglist);
        }
        let savedonelist = JSON.parse(localStorage.getItem('donelist'));
        if (savedonelist) {
            setDoneTodo(savedonelist);
        }
    }, [])
    const handleDeleteTodo = (id) => {
        console.log(id)
        const remainvalues = allTodos.filter(item => {
            console.log(item)
            return item.id !== id
        })
        console.log(remainvalues);
        localStorage.setItem('todolist', JSON.stringify(remainvalues));
        setTodos(remainvalues);
    }
    const handleDeletedoing = (id) => {
        console.log(id)
        const remainvalues = doingTodo.filter(item => {
            console.log(item)
            return item.id !== id
        })
        localStorage.setItem('doinglist', JSON.stringify(remainvalues));
        setDoingTodo(remainvalues);
    }
    const handleDeletedone = (id) => {
        console.log(id)
        const remainvalues = doneTodo.filter(item => {
            console.log(item)
            return item.id !== id
        })
        localStorage.setItem('donelist', JSON.stringify(remainvalues));
        setDoneTodo(remainvalues);
    }
    const dragStarted = (item, from) => (e) => {
        console.log(item, from)
        setTemp({ item, from })
    }
    const draggingOver = (e) => {
        e.preventDefault();
        // console.log(e);
    }

    function deleteItemFromPreviousTab(from, id) {
        if (from === 'todo') {
            const remainvalues = allTodos.filter(item => {
                console.log(item)
                return item.id !== id
            })
            localStorage.setItem('todolist', JSON.stringify(remainvalues));
            setTodos(remainvalues);
        }
        else if (from === 'Doing') {
            const remainvalues = doingTodo.filter(item => {
                console.log(item)
                return item.id !== id
            })
            localStorage.setItem('doinglist', JSON.stringify(remainvalues));
            setDoingTodo(remainvalues);
        }
        else if (from === 'Done') {
            const remainvalues = doneTodo.filter(item => {
                console.log(item)
                return item.id !== id
            })
            localStorage.setItem('donelist', JSON.stringify(remainvalues));
            setDoneTodo(remainvalues);
        }
    }
    const dragDropeddoing = (e) => {
        e.preventDefault();
        console.log(e);
        console.log('Doing', temp);
        const { item, from } = temp
        const id = item.id
        if (!doingTodo.map(ele => ele.id).includes(id)) {
            setDoingTodo([item, ...doingTodo])
            deleteItemFromPreviousTab(from, id)
            localStorage.setItem('doinglist', JSON.stringify([item, ...doingTodo]));
            setTemp([])
        }
    }
    console.log('doneTodo', doneTodo)
    console.log('unique', [...doneTodo])
    const dragDropeddone = (e) => {
        e.preventDefault();
        console.log(e);
        console.log('Done', temp);
        const { item, from } = temp
        const id = item.id
        if (!doneTodo.map(ele => ele.id).includes(id)) {
            setDoneTodo([item, ...doneTodo])
            deleteItemFromPreviousTab(from, id)
            localStorage.setItem('donelist', JSON.stringify([item, ...doneTodo]));
            setTemp([])
        }
    }

    const dragDropedtodo = (e) => {
        e.preventDefault();
        console.log(e);
        console.log('todo', temp);
        const { item, from } = temp
        const id = item.id
        if (!allTodos.map(ele => ele.id).includes(id)) {
            setTodos([item, ...allTodos])
            deleteItemFromPreviousTab(from, id)
            localStorage.setItem('todolist', JSON.stringify([item, ...allTodos]));
            setTemp([])
        }
    }
    return (
        <>
            <div className="header">
                <h1>Task List</h1>
                <button className='btn-btn-primary' onClick={() => setModal(true)}>Create Tasks
                </button>
            </div>
            <div className='input-item'>
                <div className='input-item-1' id='Todo' droppable onDragOver={draggingOver} onDrop={dragDropedtodo}>
                    <h2>Todo</h2>
                    {allTodos.map((item, index) => {
                        //console.log(item)
                        return (
                            <div className='todo-list-item' draggable onDragStart={dragStarted(item, 'todo')} key={item.id}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div className='icon-set'>
                                    <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(item.id)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div droppable onDragOver={draggingOver} onDrop={dragDropeddoing} className='input-item-2' id="Doing">
                    <h2>Doing</h2>
                    {doingTodo.map((item, index) => {
                        // console.log(item)
                        return (
                            <div className='todo-list-item' draggable onDragStart={dragStarted(item, 'Doing')} key={item.id}>
                                <div        >
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div className='icon-set'>
                                    <AiOutlineDelete className='icon' onClick={() => handleDeletedoing(item.id)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='input-item-3' id="done" droppable onDragOver={draggingOver} onDrop={dragDropeddone}>
                    <h2>Done</h2>
                    {doneTodo.map((item, index) => {
                        // console.log(item)
                        return (
                            <div className='todo-list-item' draggable onDragStart={dragStarted(item, 'Done')} key={item.id}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div className='icon-set'>
                                    <AiOutlineDelete className='icon' onClick={() => handleDeletedone(item.id)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>


            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create Task</ModalHeader>
                <ModalBody>
                    <form>
                        <div className='form-group'>
                            <label>Task Name</label>
                            <input type='text' className='form-control' value={newTitle} onChange={handlechange} name="newTitle" placeholder="Task's Name"></input>
                        </div>
                        <div className='form-group'>
                            <label>Description</label>
                            <textarea rows='5' className='form-control' value={newDescription} onChange={handlechange} name="newDescription" placeholder="Task's Description"></textarea>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { handleAddTodo(); toggle(); blank(); }}> Create</Button>
                    <Button color="secondary" onClick={toggle}> Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};
export default Tlist;
