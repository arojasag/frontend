/**This route is used for tRPC testing purposes */

"use client"

import { useState, type SetStateAction } from "react";
import { api } from "~/trpc/react";

const Todos = () => {
        
    const [todoUserName, setTodoUserName] = useState("");
    const [todoText, setTodoText] = useState("");        
    
    const inputs = [
        {label: "ID", labelId: "id", placeholder: "UserID", onChange: setTodoUserName},
        {label: "TODO", labelId: "todo", placeholder: "TODO", onChange: setTodoText},
    ];

    const utils = api.useUtils();

    const mutation = api.todos.createTodo.useMutation({
        onSuccess: async () => {            
            await utils.todos.getTodo.invalidate();            
            await utils.todos.getTodo.refetch();            
        }
    });

    // const { data, error, isLoading } = api.todos.getTodo.useQuery(undefined, {
    //     refetchOnWindowFocus: true,
    //     refetchOnReconnect: true,
    // });

    // const { data, error, isLoading} as {groupsData, groupsError, groupsIsLoading} = api.groups.getGroups.useQuery(undefined, {
    //     refetchOnWindowFocus: true,
    //     refetchOnReconnect: true,        
    // })

    const { data: todosData, error: todosError, isLoading: todosIsLoading } = api.todos.getTodo.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    });

    const { data: groupsData, error: groupsError, isLoading: groupsIsLoading } = api.groups.getGroups.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    });    

    const sendMutations = async () => {
        try {
        const response = await mutation.mutateAsync({ text: todoText, userName: todoUserName });
        console.log(response.errors);
        setTodoUserName(""); setTodoText("");
        } catch (error) { alert(error) }
    };                
    
    const todos = todosData?.todos?.todos ?? [];
    const groups = groupsData?.groups?.groups ?? [];

    return (
        <main className="flex flex-col items-center w-full min-h-[100vh] bg-[#111111] p-5 gap-5 text-white">
            <h1 className="text-3xl font-semibold text-white">Hola. Testing de tRPC</h1>
            <div className="flex flex-row items-center justify-center w-full gap-10">
                <section className="flex flex-col items-center w-[40%] gap-10 border-2 rounded-md border-black p-2 py-10 bg-[#222222]">
                    {todosIsLoading  && <h1>{"Cargando TODOs"}</h1>}
                    {todosError      && <h1 className="text-red text-bold">{"Error fetching TODOs"}</h1> }
                    {!todosIsLoading && !todosError && (
                    <>
                        <h2>Crea un nuevo TODO</h2>
                        <form className="self-center w-[90%] py-4 px-5 bg-[#333333] border-2 border-black text-white rounded-md">
                            <ul className="flex flex-row justify-center gap-5">
                                {inputs.map(input => (
                                    <InputTODO
                                        key={input.labelId}
                                        label={input.label}
                                        labelId={input.labelId}
                                        placeholder={input.placeholder}
                                        onChange={input.onChange}
                                    />
                                ))}
                                <li className="flex flex-col justify-end w-[20%]">
                                    <button 
                                        type="button" 
                                        className="flex justify-center items-center border-2 border-black rounded-md text-center font-semibold bg-blue-300 hover:bg-gray-300 hover:cursor-pointer p-1 h-[50%]"
                                        onClick={() => sendMutations()}
                                    >
                                        Crear
                                    </button>      
                                </li>
                            </ul>              
                        </form>                  
                        <h2>Lista de TODOS</h2>
                        <div className="grid grid-cols-2 place-items-center w-[90%] px-5 gap-5 rounded-md">
                            {todos?.map(todo => (
                                <div key={todo.id} className="self-center rounded-md border-2 border-black bg-[#333333] w-full p-4 px-8">
                                    <p className="font-semibold text-white">{todo.text}</p>                                                
                                    <p className="text-white">{todo.user.name}</p>
                                </div>
                            ))}
                        </div>
                    </>
                    )}         
                </section>
                <section className="flex flex-col items-center justify-center flex-1 border-2 bg-[#222222] h-[100%] p-2 py-10 rounded-md border-2 border-black gap-5 p-5 py-10">
                    <h2>Grupos</h2>
                    <h3>Crea un Grupo</h3>
                    <h3>Lista de Grupos</h3>
                    <div className="grid grid-cols-2 w-full gap-5">
                        {groups.map(grp => {
                                return (
                                    <div
                                        key={grp.id}
                                        className="flex flex-col items-center justify-center rounded-md border-2 border-black bg-[#333333] p-5 gap-3"
                                    >
                                        <h4 className="font-semibold text-xl">{grp.name}</h4>
                                        <p className="text-white">{grp.description}</p>
                                        <img src={`data:image/jpeg;base64,${grp.profilePic.data}`} alt={`${grp.name} pic`} />
                                    </div>)
                            })
                        }
                    </div>


                </section>
            </div>
        </main>
    )
};

interface inputTODOProps {
    label: string,
    labelId: string,
    placeholder: string,
    onChange: (input: SetStateAction<string>) => void
}

const InputTODO = (props: inputTODOProps) => {
    return (
        <li className="flex flex-col w-[20%] text-white">
            <label htmlFor={props.labelId} className="font-semibold text-lg">{props.label}</label>
            <input 
                type="text" 
                id={props.labelId} 
                placeholder={props.placeholder}
                className="bg-[#222222] p-1 pl-5 rounded-md"
                onChange={(e) => props.onChange(e.target.value)}
            />  
        </li>      
    )
}

export default Todos;