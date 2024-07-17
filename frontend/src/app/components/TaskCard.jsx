'use client'
import {useRouter} from 'next/navigation'



function TaskCard({data}) {

    const router = useRouter();

    const doneTask = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`, {
            method: "POST",
        })
        console.log(res)
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

    return (
        <div className="flex items-center justify-between border-t-black p-4 bg-slate-700 rounded mb-2">
            <div>
                <h2 className="font-bold">{data.title}{data.done && <span>✅</span>}</h2>
                <p>{data.department}</p>
                <p>{data.description}</p>
            </div>
            <div className="flex">
                <button 
                className="p-3 bg-red-600 mr-2 rounded"
                onClick={()=>handleDelete(data.id)}
                >Eliminar
                </button>

                <button 
                className="p-3 bg-blue-400 rounded mr-2"
                >Modificar
                </button>

                <input
                    type='checkbox'
                    onClick={()=>doneTask(data.id)}
                />

            </div>

        </div>
    )
}

export default TaskCard