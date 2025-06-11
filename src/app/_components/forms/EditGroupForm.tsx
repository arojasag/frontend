"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";
import { Button } from "~/app/_components/ui/button";
import { Switch } from "~/app/_components/ui/switch";

// Esquema del formulario de grupo
const GroupSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  isOpen: z.boolean(),
  categories: z
    .array(z.string())
    .min(1, "Debe seleccionar al menos una categoría"),
});

type GroupFormValues = z.infer<typeof GroupSchema>;

const ALL_CATEGORIES = [
  { label: "Tecnología", value: "tech" },
  { label: "Arte", value: "art" },
  { label: "Ciencia", value: "science" },
  { label: "Deportes", value: "sports" },
];

const EditGroupForm = ({ initialData }: { initialData: GroupFormValues }) => {
  const router = useRouter();

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(GroupSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: GroupFormValues) => {
    console.log("Enviar a backend:", values);
    router.push(`/groups/${initialData.id}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        {/* Nombre */}
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del grupo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción */}
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full rounded border px-3 py-2"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Grupo abierto o cerrado */}
        <FormField
          name="isOpen"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel>¿Grupo abierto?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Categorías (checkboxes) */}
        <FormField
          name="categories"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categorías</FormLabel>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  {ALL_CATEGORIES.map((cat) => (
                    <label key={cat.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value.includes(cat.value)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const newValue = isChecked
                            ? [...field.value, cat.value]
                            : field.value.filter((v) => v !== cat.value);
                          field.onChange(newValue);
                        }}
                      />
                      {cat.label}
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <Button type="submit">Guardar cambios</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditGroupForm;
