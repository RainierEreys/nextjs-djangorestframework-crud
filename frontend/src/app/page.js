import FormTasks from "./components/FormTasks"
import ListTasks from "./components/ListTasks"

export const dynamic = "auto";
export const revalidate = 0;

function HomePage() {
    return ( 
    <div className="container mx-auto pt-4"> 
      <h1>Tasks App</h1>
      <div className="flex gap-x-10">
        
        <FormTasks/>
        <ListTasks/>
      </div>
      
    </div>
    )
}

export default HomePage