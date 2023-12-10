"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select"
import { useWinners } from "@/models/winners"
import { DateTime } from "luxon"

const formSchema = z.object({
  name: z.string(),
  date: z.string()
})

export default function WinnerForm({ teams, squad }: { teams?: string[], squad: string }) {
  const { addWinner } = useWinners(squad)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, date } = values
    const datetime = DateTime.fromISO(date)
    addWinner(name, datetime)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-between gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={value => field.onChange({ target: { name, value } })}
                  name={field.name}
                  disabled={field.disabled}>
                  <SelectTrigger ref={field.ref}>
                    <SelectValue placeholder="Select Name"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {teams?.map(team => 
                      <SelectItem key={team} value={team}>{team}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="date" type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  )
}