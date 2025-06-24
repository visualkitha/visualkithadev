'use client';

import { useState, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import type { Booking } from '@/lib/types';
import type { EventClickArg, EventInput } from '@fullcalendar/core';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Building2, MapPin, User, Tag, CircleDollarSign } from 'lucide-react';

interface ScheduleClientPageProps {
  initialBookings: Booking[];
}

const statusColorMap: Record<Booking['status'], string> = {
  Draft: '#a1a1aa', // zinc-400
  Confirmed: '#3b82f6', // blue-500
  Ongoing: '#f97316', // orange-500
  Completed: '#22c55e', // green-500
  Cancelled: '#ef4444', // red-500
};

export function ScheduleClientPage({ initialBookings }: ScheduleClientPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInput | null>(null);

  const events = useMemo(() => {
    return initialBookings.map((booking): EventInput => ({
      id: booking.id,
      title: `${booking.clientName} - ${booking.eventType}`,
      start: booking.eventDate,
      allDay: true, // Assuming all events are full day
      backgroundColor: statusColorMap[booking.status] || '#a1a1aa',
      borderColor: statusColorMap[booking.status] || '#a1a1aa',
      extendedProps: {
        ...booking,
      },
    }));
  }, [initialBookings]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo.event);
    setIsDialogOpen(true);
  };
  
  const selectedBooking: Booking | null = selectedEvent?.extendedProps as Booking || null;

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="font-headline text-3xl font-bold tracking-tight">Kalender Jadwal</h1>
            <p className="text-muted-foreground">Lihat semua event dalam tampilan kalender.</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,listWeek',
              }}
              events={events}
              eventClick={handleEventClick}
              height="auto"
              locale="id"
              buttonText={{
                today:    'Hari Ini',
                month:    'Bulan',
                week:     'Minggu',
                day:      'Hari',
                list:     'Daftar'
              }}
            />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">{selectedBooking?.clientName}</DialogTitle>
            <DialogDescription>{selectedBooking?.eventType}</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 py-4">
                <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Klien: <span className="font-semibold">{selectedBooking.clientName}</span></span>
                </div>
                 <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>Jenis: <span className="font-semibold">{selectedBooking.eventType}</span></span>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Lokasi: <span className="font-semibold">{selectedBooking.location}</span></span>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Tanggal:{' '}
                      <span className="font-semibold">
                      {new Date(selectedBooking.eventDate).toLocaleDateString('id-ID', {
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      })}
                      </span>
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span>Status Booking: <Badge style={{ backgroundColor: statusColorMap[selectedBooking.status] }}>{selectedBooking.status}</Badge></span>
                </div>
                <div className="flex items-center gap-3">
                    <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>Status Bayar: <Badge variant="secondary">{selectedBooking.paymentStatus}</Badge></span>
                </div>
                
                <div className="pt-4">
                    <Button asChild className="w-full">
                        <Link href="/admin/bookings">Lihat Detail Booking</Link>
                    </Button>
                </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
