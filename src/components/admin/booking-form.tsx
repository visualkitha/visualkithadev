
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from "date-fns";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { LoaderCircle, CalendarIcon, Trash2, PlusCircle } from 'lucide-react';
import type { Booking, Client, CrewMember } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  clientId: z.string().min(1, 'Klien harus dipilih.'),
  location: z.string().min(3, 'Lokasi harus minimal 3 karakter.'),
  eventDate: z.date({
    required_error: "Tanggal acara wajib diisi.",
  }),
  eventType: z.string().min(2, 'Jenis acara harus minimal 2 karakter.'),
  status: z.enum(['Draft', 'Confirmed', 'Ongoing', 'Completed', 'Cancelled']),
  paymentStatus: z.enum(['Unpaid', 'Down Payment', 'Paid', 'Refunded']),
  technicalNeeds: z.array(
    z.object({
      description: z.string().min(1, 'Deskripsi tidak boleh kosong.'),
      completed: z.boolean(),
    })
  ).optional(),
  crewTasks: z.array(
    z.object({
      description: z.string().min(1, 'Deskripsi tidak boleh kosong.'),
      completed: z.boolean(),
    })
  ).optional(),
  assignedCrew: z.array(z.string()).optional(),
});

export type BookingFormValues = z.infer<typeof formSchema>;

interface BookingFormProps {
  initialData?: Booking | null;
  clients: Client[];
  crewMembers: CrewMember[];
  onSubmit: (data: BookingFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function BookingForm({ initialData, clients, crewMembers, onSubmit, onCancel, isSubmitting }: BookingFormProps) {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          eventDate: new Date(initialData.eventDate),
          technicalNeeds: initialData.technicalNeeds || [],
          crewTasks: initialData.crewTasks || [],
          assignedCrew: initialData.assignedCrew || [],
        }
      : {
          clientId: '',
          location: '',
          eventDate: undefined,
          eventType: '',
          status: 'Draft',
          paymentStatus: 'Unpaid',
          technicalNeeds: [],
          crewTasks: [],
          assignedCrew: [],
        },
  });

  const { fields: techNeedsFields, append: appendTechNeed, remove: removeTechNeed } = useFieldArray({
    control: form.control,
    name: 'technicalNeeds',
  });
  
  const { fields: crewTaskFields, append: appendCrewTask, remove: removeCrewTask } = useFieldArray({
    control: form.control,
    name: 'crewTasks',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Klien</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih klien" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Acara</FormLabel>
                <FormControl>
                  <Input placeholder="cth., Pernikahan, Konser, Seminar" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Lokasi Acara</FormLabel>
                <FormControl>
                    <Input placeholder="cth., Hotel Grand Hyatt, Jakarta" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Tanggal Acara</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            disabled={isSubmitting}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pilih tanggal</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1990-01-01") }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Status Booking</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Pilih status booking" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Draft">Draf</SelectItem>
                        <SelectItem value="Confirmed">Dikonfirmasi</SelectItem>
                        <SelectItem value="Ongoing">Berjalan</SelectItem>
                        <SelectItem value="Completed">Selesai</SelectItem>
                        <SelectItem value="Cancelled">Batal</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Status Pembayaran</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Pilih status pembayaran" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Unpaid">Belum Lunas</SelectItem>
                        <SelectItem value="Down Payment">DP</SelectItem>
                        <SelectItem value="Paid">Lunas</SelectItem>
                        <SelectItem value="Refunded">Dikembalikan</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Penugasan Tim Teknis</CardTitle>
            </CardHeader>
            <CardContent>
                 <FormField
                    control={form.control}
                    name="assignedCrew"
                    render={() => (
                        <FormItem>
                            <ScrollArea className="h-40 rounded-md border p-4">
                               <div className="space-y-2">
                                {crewMembers.map((member) => (
                                    <FormField
                                    key={member.id}
                                    control={form.control}
                                    name="assignedCrew"
                                    render={({ field }) => {
                                        return (
                                        <FormItem
                                            key={member.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(member.id)}
                                                onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...(field.value || []), member.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== member.id
                                                        )
                                                    )
                                                }}
                                            />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                               {member.name} <span className="text-muted-foreground">({member.role})</span>
                                            </FormLabel>
                                        </FormItem>
                                        )
                                    }}
                                    />
                                ))}
                                </div>
                            </ScrollArea>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
            </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Checklist Kebutuhan Peralatan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    {techNeedsFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                            <Checkbox
                                {...form.register(`technicalNeeds.${index}.completed`)}
                                disabled={isSubmitting}
                            />
                            <Input
                                placeholder="cth., LED Screen 4x3m"
                                {...form.register(`technicalNeeds.${index}.description`)}
                                disabled={isSubmitting}
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => removeTechNeed(index)}
                                disabled={isSubmitting}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => appendTechNeed({ description: '', completed: false })}
                        disabled={isSubmitting}
                        >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah Kebutuhan
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Checklist Tugas Tim</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    {crewTaskFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                            <Checkbox
                                {...form.register(`crewTasks.${index}.completed`)}
                                disabled={isSubmitting}
                            />
                            <Input
                                placeholder="cth., Instalasi Panggung"
                                {...form.register(`crewTasks.${index}.description`)}
                                disabled={isSubmitting}
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => removeCrewTask(index)}
                                disabled={isSubmitting}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => appendCrewTask({ description: '', completed: false })}
                        disabled={isSubmitting}
                        >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah Tugas
                    </Button>
                </CardContent>
            </Card>
        </div>


        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Simpan Perubahan' : 'Buat Booking'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
