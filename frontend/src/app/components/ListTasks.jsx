
import TaskCard from './TaskCard'

async function LoadedTasks(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`) /*SOLICITUD DE DATOS... ESTE ES UN METODO DE TIPO SERVIDOR NO 'USE CLIENT'*/
    const tasks = await res.json()
    return tasks
}

async function ListTasks(){

    const data = await LoadedTasks()
    console.log(data)
    return (
        <div className="bg-slate-500 w-full p-4">
            <h1>Lista de tareas</h1>

            {data.map((data) => (
                <TaskCard data={data} key={data.id}/>
            ))}

        </div>
    )
}

export default ListTasks