import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar as CalendarIcon, Clock, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const bookingSchema = z.object({
  vetId: z.string().min(1, "Please select a veterinarian"),
  date: z.date({ required_error: "A date is required" }),
  time: z.string().min(1, "Please select a time"),
});

const vets = [
  { id: "1", name: "Dr. Sarah Wilson", specialty: "General & Surgery" },
  { id: "2", name: "Dr. Mike Chen", specialty: "Dermatology" },
  { id: "3", name: "Dr. Emily Brown", specialty: "Nutrition & Wellness" },
];

const timeSlots = ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

export default function Booking() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API save
    setTimeout(() => {
      const existingBookings = JSON.parse(localStorage.getItem("petcare_bookings") || "[]");
      const newBooking = {
        ...data,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem("petcare_bookings", JSON.stringify([...existingBookings, newBooking]));
      
      toast({
        title: "Appointment Confirmed!",
        description: `Booked with ${vets.find(v => v.id === data.vetId)?.name} on ${format(data.date, "PPP")} at ${data.time}`,
      });
      
      setIsSubmitting(false);
      form.reset();
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-display font-bold">Book a Consultation</h1>
        <p className="text-muted-foreground">Choose the best time for your pet's checkup</p>
      </div>

      <Card className="border-0 shadow-xl shadow-black/5 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>Fill in the form below to secure your spot</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Vet Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Veterinarian</label>
              <Select onValueChange={(val) => form.setValue("vetId", val)}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Choose a vet" />
                </SelectTrigger>
                <SelectContent>
                  {vets.map((vet) => (
                    <SelectItem key={vet.id} value={vet.id}>
                      <div className="flex flex-col text-left py-1">
                        <span className="font-semibold">{vet.name}</span>
                        <span className="text-xs text-muted-foreground">{vet.specialty}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.vetId && (
                <p className="text-sm text-destructive">{form.formState.errors.vetId.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Picker */}
              <div className="space-y-2 flex flex-col">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 rounded-xl w-full justify-start text-left font-normal border-input hover:bg-muted/50",
                        !form.watch("date") && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.watch("date") ? format(form.watch("date"), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.watch("date")}
                      onSelect={(date) => date && form.setValue("date", date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.date && (
                  <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>
                )}
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Slot</label>
                <Select onValueChange={(val) => form.setValue("time", val)}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Pick a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.time && (
                  <p className="text-sm text-destructive">{form.formState.errors.time.message}</p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Booking Appointment..." : "Confirm Booking"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
