'use client'


function TaskCard({data}) {
    return (
        <div className="flex items-center justify-between border-t-black p-4 bg-slate-700 rounded mb-2">
            <div>
                <h2 className="font-bold">{data.title}</h2>
                <p>{data.department}</p>
                <p>{data.description}</p>
            </div>
            <div className="flex">
                <button className="p-3 bg-red-600 mr-2 rounded">Eliminar</button>
                <button className="p-3 bg-blue-400 rounded">Modificar</button>
            </div>

        </div>
    )
}

export default TaskCard