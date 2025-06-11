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
// import { api } from "~/app/_trpc/api"; // Uncomment this line if you have a real API

const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  description: z.string().optional(),
  place: z.string(),
  starts_at: z.string(),
  ends_at: z.string(),
  capacity: z.coerce.number().min(1),
});

type EventFormValues = z.infer<typeof eventSchema>;
const EditEventForm = ({ initialData }: { initialData: EventFormValues }) => {
  const router = useRouter();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: EventFormValues) => {
    console.log("Enviar a backend:", values);

    // Here you would typically call your API to update the event.
    // For example:
    // await api.events.update.mutate({ id, ...values })

    router.push(`/events/${initialData.id}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Left column */}
          <div className="space-y-5 md:w-1/2">
            {/* Título */}
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
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
          </div>

          {/* Right column */}
          <div className="space-y-5 md:w-1/2">
            {/* Place */}
            <FormField
              name="place"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lugar</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date and time of start */}
            <FormField
              name="starts_at"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha y hora de inicio</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="datetime-local"
                      value={field.value?.slice(0, 16) || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date and time of end */}
            <FormField
              name="ends_at"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha y hora de fin</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="datetime-local"
                      value={field.value?.slice(0, 16) || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Capacity */}
            <FormField
              name="capacity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidad</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* Save button */}
        <div className="flex gap-4 pt-6 md:w-full md:pt-0">
          <Button type="submit" className="w-full md:w-auto">
            Guardar cambios
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditEventForm;
