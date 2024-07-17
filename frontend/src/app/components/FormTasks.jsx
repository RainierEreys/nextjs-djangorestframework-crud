'use client'
import {useState} from 'react';
import {useRouter} from 'next/navigation';


function FormTasks(){

    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [description, setDescription] = useState('');

    const router = useRouter()

    const handleSubmit = async e=>{ /*AWAIT PORQUE LA FUNCION ES ASINCRONA (POR ESO SE DEBE COLOCAR ASYNC E)*/
        e.preventDefault() 
        console.log(title, department, description)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`, {/*PARA LEER VARIABLE CONTENIDA EN ARCHIVO .ENV*/ /*NO SE LLAMA "BACKEND_URL" SINO "NEXT_PUBLIC_BACKEND_URL" PORQUE ESTOY EN EL FRONTEND*/
            method: "POST",/*ESPECIFICARLE EL METODO*/
            body: JSON.stringify({title, department, description}),/*LOS DATOS CONVERTIDOS EN UN JSON EN FORMATO DE STRING*/
            headers: {
                "Content-Type": "application/json"
            }/*ENVIARLE UN HEADER QUE ESPECIFIQUE QUE SE LE ENVIA UN JSON AL BACKEND*/
        })
        const data = res.json /*SE ESTA CONVIRTIENDO EL RES EN JSON*/ /*await pq es un proceso asincrono*/
        console.log(data);
        router.refresh()
    }
    return (
        
        <div className="bg-slate-300 w-100 p-3 rounded">
            
            <form onSubmit={handleSubmit}>
                <h1 className="text-black font-bold">Añadir Tarea</h1>


                <input 
                type="text"  
                placeholder="Título"
                name="title" 
                className="placeholder:text-gray-600 placeholder:font-bold border-gray-300 w-full mb-2 block rounded bg-clip-border text-gray-950 bg-slate-400 p-2"
                onChange={e => setTitle(e.target.value)}
                />

                <input 
                type="text" 
                placeholder="Departamento"
                name="department" 
                className="placeholder:text-gray-600 placeholder:font-bold border-gray-300 w-full mb-2 block rounded bg-clip-border text-gray-950 bg-slate-400 p-2"
                onChange={e => setDepartment(e.target.value)}
                />

                <textarea 
                name="description" 
                placeholder="Descripción"
                className="placeholder:text-gray-600 placeholder:font-bold border-gray-300 w-full rounded mb-2 block bg-clip-border text-gray-950 bg-slate-400 p-2" id=""
                onChange={e => setDescription(e.target.value)}
                />

                <button className="bg-blue-600 text-white p-3 rounded border-gray-800" method="POST">Save</button>
            </form>
        </div>
    )
}

export default FormTasks 