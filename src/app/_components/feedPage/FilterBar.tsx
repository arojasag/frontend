import Link from "next/link";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Sparkles,
  UsersRound,
  Pizza,
  Origami,
  Volleyball,
  Plane,
  BriefcaseBusiness,
  Computer,
  Earth,
} from "lucide-react";

interface FilterBarProps {
  view: "events" | "groups";
  onChange: (view: "events" | "groups") => void;
}

const categories = [
  { name: "Cualquier categoría", icon: Sparkles },
  { name: "Nuevos grupos", icon: UsersRound },
  { name: "Actividades sociales", icon: Pizza },
  { name: "Aficiones y pasiones", icon: Origami },
  { name: "Deportes y actividad física", icon: Volleyball },
  { name: "Viajes y actividades al aire libre", icon: Plane },
  { name: "Trabajo y negocios", icon: BriefcaseBusiness },
  { name: "Tecnología", icon: Computer },
  { name: "Comunidad", icon: Earth },
];

export default function FilterBar({ view, onChange }: FilterBarProps) {
  return (
    <section className="sticky top-16 z-40 border-b-2 border-gray-200 bg-white px-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex space-x-4">
            <button
              onClick={() => onChange("events")}
              className={`cursor-pointer border-b-3 px-2 pb-1 transition ${
                view === "events"
                  ? "border-black font-bold text-black"
                  : "border-transparent text-gray-600"
              }`}
            >
              Eventos
            </button>
            <button
              onClick={() => onChange("groups")}
              className={`cursor-pointer border-b-3 px-2 pb-1 transition ${
                view === "groups"
                  ? "border-black font-bold text-black"
                  : "border-transparent text-gray-600"
              }`}
            >
              Grupos
            </button>
          </div>
          <Link
            href={`/${view === "events" ? "events/create" : "groups/create"}`}
            className="flex items-center"
          >
            <Button>Crear {view === "events" ? "Evento" : "Grupo"}</Button>
          </Link>
        </div>

        {/* Categories */}

        {/* Filters */}
        <div className="flex items-center justify-between px-6 py-3">
          <div>
            <h1 className="text-xl font-bold">
              {view === "events" ? "Eventos" : "Grupos"} cerca de Bogotá, CO
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Dropdown for "Cualquier día" */}
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Dropdown for "Cualquier tipo" */}
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Dropdown for "150 kilómetros" */}
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Reset Button */}
            <Button variant="outline">Restablecer</Button>
          </div>
        </div>
        <div className="no-scrollbar flex items-center justify-between overflow-x-auto px-6 pt-6">
          {categories.map((category, idx) => {
            // Let's assume the first category is selected by default for demo purposes.
            // Replace `selectedCategoryIdx` with your state if you want to control selection.
            const selectedCategoryIdx = 0;
            const isSelected = idx === selectedCategoryIdx;
            return (
              <button
                key={category.name}
                className={`flex flex-col items-center px-3 pb-1 text-gray-600 transition hover:text-black focus:outline-none ${
                  isSelected
                    ? "border-b-3 border-black font-bold text-black"
                    : "border-b-3 border-transparent"
                }`}
                // onClick handler should update selectedCategoryIdx in your state
                type="button"
              >
                <category.icon className="mb-1 h-6 w-6" />
                <span className="text-sm">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
