/**This route only fetches TODO template GraphQL API code, for now */

import { api } from "~/trpc/server";

const Todos = async () => {
    
    const response = await api.todos.getTodo();

    return (
        <main className="flex flex-col items-center w-full min-h-[100vh] bg-green-100 p-5 gap-5">
            <h1 className="text-3xl font-semibold">Hola</h1>
            <div className="flex flex-col w-[60%] gap-5">
                <h2>Lista de TODOS</h2>
                {response.todos?.todos.map(todo => (
                    <div key={todo.id} className="border-2 border-black w-[80%] p-2">
                        <p className="font-semibold">{todo.text}</p>
                        <p>{todo.id}</p>                    
                        <p>{todo.user.id}</p>
                    </div>
                ))}                
            </div>

        </main>
    )
};

export default Todos;