'use client'
import {useRouter} from 'next/navigation'
import { useState } from 'react';


function TaskCard({data}) {

    const [edit, setEdit] = useState(false);

    const [newTitle, setNewTitle] = useState(data.title);
    const [newDepartment, setNewDepartment] = useState(data.department);
    const [newDescription, setNewDescription] = useState(data.description);

    const router = useRouter();

    const doneTask = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`, {
            method: "POST",
        })
        console.log(res)
        if(res.status === 200){
            router.push('/', {scroll: false});
        }
    }

    const handleDelete = async (id) => {
        if(window.confirm('¿Quieres eliminar esta tarea?')){
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}`, {
                method: "DELETE",
            })
            if(res.status === 204){
                router.refresh();
            }
        }

    }

    const handleUpdate = async (id) => {
        console.log(id);
        console.log(newTitle, newDepartment, newDescription);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, {
            method: "PUT", 
            body: JSON.stringify({title: newTitle, department: newDepartment, description: newDescription}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = res.json;
        console.log(data);
        setNewTitle(data.title);
        setNewDepartment(data.department);
        setNewDescription(data.description);

        setEdit(false);
            
    }

    return (
        <div className="flex items-center justify-between border-t-black p-4 bg-slate-700 rounded mb-2">
            <div>{
                !edit ? (
                    <h2 className="font-bold">{newTitle}{data.done && <span>✅</span>}</h2>
                ) : ( 
                    <input 
                    type="text" 
                    placeholder={data.title} 
                    className='text-black p-2 rounded-md outline-none'
                    onChange={e => setNewTitle(e.target.value)}
                    /> 
                    )
            }
            {
                !edit ? (
                    <p>{newDepartment}</p>
                    ) : (
                        <input 
                        type="text" 
                        placeholder={data.department} 
                        className='block p-1 outline-none text-black bg-slate-700 border-none'
                        onChange={e => setNewDepartment(e.target.value)}
                        />
                    )
            }
            {
                !edit ? (
                    <p>{newDescription}</p>
                    ) : (
                        <input 
                        type="text" 
                        placeholder={data.description} 
                        className='block p-1 outline-none text-black bg-slate-700 border-none'
                        onChange={e => setNewDescription(e.target.value)}
                        />
                    )
            }
            
            </div>
            <div className="flex">
                <button 
                className="p-3 bg-red-600 mr-2 rounded"
                onClick={()=>handleDelete(data.id)}
                >Eliminar
                </button>

                <button 
                className="p-3 bg-blue-400 rounded mr-2"
                onClick={
                    !edit ? (
                    ()=> setEdit(!edit)
                    ) : (
                        ()=>handleUpdate(data.id)
                        )}
                >{
                    !edit ? "Modificar" : "Guardar"
                }
                </button>

                <button 
                className={
                    "p-3 mr-2 rounded" + (data.done ? " bg-green-500" : " bg-gray-800")
                }
                onClick={()=>doneTask(data.id)}
                >{data.done ? "Desmarcar Tarea" : "Tarea Hecha"}
                </button>

            </div>

        </div>
    )
}

export default TaskCard