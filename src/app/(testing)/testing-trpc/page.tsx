/* eslint-disable @next/next/no-img-element */
/**This route is used for tRPC testing purposes */

"use client"

import { useReducer, useState, type Dispatch, type SetStateAction } from "react";
import { api } from "~/trpc/react";

interface User {
    email?: string
    username?: string
}

const Testing = () => {

    const [user, setUser] = useState<User|undefined>(undefined);

    const logout = api.auth.logout.useMutation();

    return (
        <main className="flex flex-col items-center w-full min-h-[100vh] bg-[#111111] p-5 gap-5 text-white">
            <h1 className="text-3xl font-semibold text-white">Hola. Testing de tRPC</h1>
            <div className="w-full">
                <div className="flex flex-row items-center sm:w-full lg:w-[35%] border-2 rounded-lg border-black bg-[#222222] p-3 pl-10 text-white">
                    <div className="flex flex-col gap-1 w-[80%]">
                        <h2 className="mb-2 text-2xl">
                            {user ? "Usuario Logueado" : "No hay usuario logueado"}
                        </h2>
                        {user && (
                            <>
                                <p className="font-semibold text-white">{user.username}</p>
                                <p className="text-white">{user.email}</p>
                            </>
                        )}
                    </div>
                    <button
                    className="h-[20%] p-2 px-4 bg-blue-500 rounded-md hover:cursor-pointer hover:bg-blue-700"
                    onClick={() => {
                        logout.mutate()
                        setUser(undefined)
                    }}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row sm:items-center lg:items-start w-full gap-10">
                <SignUpTest changeUser={{setUser}}/>
                <LoginTest changeUser={{setUser}}/>
                <GroupsTest/>
            </div>
        </main>
    )
};

export default Testing;

type FormState = Record<string, string>;

type FormAction = {
  type: 'UPDATE_FIELD';
  fieldId: string;
  value: string;
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.fieldId]: action.value,
      };
    default:
      return state;
  }
};

interface Input {
    label: string,
    labelId: string,
    placeholder: string,
}

interface SimpleFormProps {
    inputs: Input[]
    className: string
    title?: string
    buttonMessage?: string
    onSubmit: (formData: Record<string, string>) => void;
}

const SimpleForm = (props: SimpleFormProps) => {

    const initialState = props.inputs.reduce((acc, input) => {
        acc[input.labelId] = '';
        return acc;
    }, {} as FormState);

    const [formState, dispatch] = useReducer(formReducer, initialState);

    const handleChange = (fieldId: string, value: string) => {
        dispatch({ type: 'UPDATE_FIELD', fieldId, value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formState);
        props.onSubmit(formState);
    };

    return (
        <form className={props.className} onSubmit={handleSubmit}>
            <h3>{props.title ?? "Test Form"}</h3>
            {props.inputs.map(input => {
                return (
                    <div key={input.labelId} className="flex flex-col gap-1 p-1">
                        <label htmlFor={input.labelId}>{input.label}</label>
                        <input
                            type="text"
                            id={input.labelId}
                            placeholder={input.placeholder}
                            className="rounded-md border-2 border-white p-1 pl-4"
                            value={formState[input.labelId] ?? ''}
                            onChange={(e) => handleChange(input.labelId, e.target.value)}
                        />
                    </div>
                )
            })}
            <button type="submit"
                className="border-2 rounded-md bg-blue-500 p-1 px-3"
            >
                {props.buttonMessage ?? "Enviar"}
            </button>
        </form>
    )
}

const GroupsTest = () => {

    const { data: groupsData, error: groupsError, isLoading: groupsIsLoading } = api.groups.getGroups.useQuery(undefined, {
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const groups = groupsData?.groups ?? [];

    return (
    <section className="flex flex-col items-center justify-center sm:w-[100%] lg:flex-1 border-2 bg-[#222222] h-[100%] p-2 py-10 rounded-md border-2 border-black gap-5 p-5 py-10">
        {groupsIsLoading  && <h1>{"Cargando Grupos"}</h1>}
        {groupsError      && <h1 className="text-red text-bold">{"Error consultando Grupos"}</h1> }
        {!groupsIsLoading && !groupsError && (
            <>
                <h2>Grupos</h2>
                <CreateGroupComponent/>
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
                                <img src={`data:image/${grp.profilePic.mimeType};base64,${grp.profilePic.data}`} alt={`${grp.name} pic`} />
                            </div>)
                        })
                    }
                </div>
            </>
        )}
    </section>
    )
}

interface GroupToCreate {
    name?: string
    description?: string
    profilePic?: string
    isOpen?: boolean
};

type GroupAction = "name" | "description" | "profilePic" | "isOpen" | "reset";

interface ChangeGroupState {
    action: GroupAction
    newValue: string | boolean
}


const CreateGroupComponent = () => {

    const groupReducer = (state: GroupToCreate, action: ChangeGroupState) => {
        switch (action.action) {
            case "name":        return {...state, name: action.newValue as string};
            case "description": return {...state, description: action.newValue as string};
            case "profilePic":  return {...state, profilePic: action.newValue as string};
            case "isOpen":      return {...state, isOpen: action.newValue as boolean}
            case "reset":       return {name: "", description: "", profilePic: "", isOpen: true}
        }
    };

    const [groupState, groupsDispatch] = useReducer(groupReducer, {
        name: "",
        description: "",
        profilePic: "",
        isOpen: true
    });

    const utils = api.useUtils();

    const mutation = api.groups.createGroup.useMutation({
        onSuccess: async () => {
            await utils.groups.getGroups.invalidate();
            await utils.groups.getGroups.refetch();
        }
    });

    const sendMutations = async () => {
        try {
            console.log(groupState);
            if(!groupState.name || groupState.name === "") {
                alert ("Nombre no dado");
                return;
            }
            if(!groupState.isOpen) {
                alert ("isOpen not provided");
                return;
            }
            const response = await mutation.mutateAsync({
                name: groupState.name,
                description: groupState.description,
                profilePic: groupState.profilePic ? groupState.profilePic.split(",")[1] : groupState.profilePic,
                isOpen: groupState.isOpen,
            });

            if(response) {
                groupsDispatch({action: "reset", newValue: ""});
                console.log(response);
            }
            else alert("Algo salió mal");

        } catch (e) {
            alert(e)
        }
    };

    const groupInputs: {label: string, labelId: string, placeholder: string, type: string, action: GroupAction, width: string}[] = [
        {label: "Nombre", labelId: "name", placeholder: "Grupo", type: "text", action: "name", width: "w-[40%]"},
        {label: "Descripción", labelId: "description", placeholder: "Descripción", type: "text", action: "description", width: "w-[40%]"},
    ]

    return (
        <form className="flex flex-col items-center justify-center w-[95%] border-2 border-black rounded-md bg-[#333333] gap-5 p-5">
            <h3>Crea un Grupo</h3>
            <div className="flex flex-row items-center justify-center rounded-md w-[85%] gap-2 py-2">
                {groupInputs.map(grp => {
                    return (
                    <div className="flex flex-col w-[40%] p-2 gap-2 rounded-md" key={grp.labelId}>
                        <label htmlFor={grp.labelId} className="font-semibold">
                            {grp.label}
                        </label>
                        <input
                            id={grp.labelId}
                            type={grp.type}
                            placeholder={grp.placeholder}
                            className="text-white border-2 border-white rounded-md pl-3 py-1 w-[95%]"
                            onChange={(e) => {
                                groupsDispatch({
                                action: grp.action,
                                newValue: e.target.value
                                });
                            }}
                        />
                    </div>
                    )
                })}
                <div className="flex flex-col items-center justify-center flex-1 h-[100%] gap-2">
                    <label htmlFor="isOpen" className="font-semibold">{"¿Abierto?"}</label>
                    <input
                    type="checkbox"
                    id="isOpen"
                    onChange={e =>  {
                        groupsDispatch({
                            action: "isOpen",
                            newValue: e.target.checked
                        })
                    }}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                {(groupState.profilePic) ? <img src={groupState.profilePic} alt="Imagen Seleccionada" className="w-[60%]"/> : <span id="file-name" className="ml-2 text-gray-500">{"Ningún archivo seleccionado"}</span>}
                <label htmlFor="profilePic" className="font-semibold cursor-pointer bg-blue-700 px-4 py-2 rounded-md mb-2">
                    {"Seleccionar Foto del grupo"}
                </label>
                <input
                    type="file"
                    accept="image/jpeg"
                    className="hidden"
                    id="profilePic"
                    onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                if(event.target) {
                                    groupsDispatch({
                                        action: "profilePic",
                                        newValue: event.target.result as string // Base64
                                    });
                                }
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                />
            </div>
            <button
                className="bg-blue-500 text-white rounded-md px-5 py-2 hover:cursor-pointer hover:bg-blue-700"
                type="button"
                onClick={async () => await sendMutations()}
            >
                {"Crear"}
            </button>
        </form>
    );
};

interface ChangeUserInfo {
    setUser: Dispatch<SetStateAction<User|undefined>>
}

interface NewUser {
    email: string,
    username: string,
    password: string
}

interface SignUpTestProps {
    changeUser: ChangeUserInfo
}

const SignUpTest = (props: SignUpTestProps) => {

    const inputs: Input[] = [
        {label: "Correo", labelId: "email", placeholder: "Correo"},
        {label: "Username", labelId: "username", placeholder: "Nombre de Usuario"},
        {label: "Contraseña", labelId: "password", placeholder: "Contraseña"}
    ];

    const mutation = api.auth.singUp.useMutation();

    return (
        <section className="flex flex-col items-center justify-center sm:w-[80%] lg:w-[25%] border-2 bg-[#222222] h-[100%] p-2 py-10 rounded-md border-2 border-black gap-5 p-5 py-10">
            <SimpleForm
            inputs={inputs}
            title="Sign Up"
            onSubmit={formData => {
                mutation.mutate(formData as unknown as NewUser, {
                    onSuccess: (data) => {
                        console.log("Registro exitoso:", data);
                        props.changeUser.setUser({
                            username: data.username,
                            email: data.email,
                        })
                    },
                    onError: (error) => {
                        console.error("Error en registro:", error);
                    }
                });
            }}
            className={"flex flex-col items-center justify-center gap-4 px-3 w-full bg-[#333333] border-2 border-black rounded-md p-4"}/>
        </section>
    )
}

interface LoginUser {
    email: string,
    password: string
}

interface LoginTestProps {
    changeUser: ChangeUserInfo
}

const LoginTest = (props: LoginTestProps) => {

    const inputs: Input[] = [
        {label: "Correo", labelId: "email", placeholder: "Correo"},
        {label: "Contraseña", labelId: "password", placeholder: "Contraseña"}
    ];

    const mutation = api.auth.login.useMutation();

    return (
        <section className="flex flex-col items-center justify-center sm:w-[80%] lg:w-[25%] border-2 bg-[#222222] h-[100%] p-2 py-10 rounded-md border-2 border-black gap-5 p-5 py-10">
            <SimpleForm
            inputs={inputs}
            title="Login"
            onSubmit={formData => {
                mutation.mutate(formData as unknown as LoginUser, {
                    onSuccess: (data) => {
                        console.log("Registro exitoso:", data);
                        props.changeUser.setUser({
                            username: data.username,
                            email: data.email
                        })
                    },
                    onError: (error) => {
                        console.error("Error en registro:", error);
                    }
                });
            }}
            className={"flex flex-col items-center justify-center w-[90%] gap-4 p-1 bg-[#333333] border-2 border-black rounded-md p-4"}
            />
        </section>

    )

}