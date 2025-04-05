import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { sendConfirmationEmail, sendSupportEmail } from "@/utils/emailUtils";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  company: z.string().optional(),
  attendeeCount: z.string().min(1, { message: "Number of attendees is required" }),
  selectedDate: z.date({ required_error: "Please select a date" }),
  dietaryRequirements: z.string().optional(),
  questions: z.string().optional(),
  marketingConsent: z.boolean().optional(),
  selectedEventId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BookingFormProps {
  eventTitle?: string;
  eventPrice?: string;
  eventLocation?: string;
  eventDate?: string;
  eventTime?: string;
  eventId?: number | string;
  availableEvents?: Array<{
    id: number;
    title: string;
    date: string;
    location: string;
    price: string;
    time: string;
  }>;
  onSubmitSuccess: () => void;
}

const BookingForm = ({
  eventTitle,
  eventPrice,
  eventLocation,
  eventDate,
  eventTime,
  eventId,
  availableEvents = [],
  onSubmitSuccess
}: BookingFormProps) => {
  const { toast } = useToast();
  
  const defaultDate = new Date(2025, 4, 1); // May 1st, 2025
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      attendeeCount: "1",
      selectedDate: defaultDate,
      dietaryRequirements: "",
      questions: "",
      marketingConsent: false,
      selectedEventId: eventId?.toString() || "",
    },
  });

  const selectedEventId = form.watch("selectedEventId");

  React.useEffect(() => {
    if (selectedEventId && availableEvents.length > 0) {
      const selectedEvent = availableEvents.find(e => e.id.toString() === selectedEventId);
      if (selectedEvent) {
        form.setValue("selectedDate", defaultDate); // Ensure date is selected when an event is chosen
      }
    }
  }, [selectedEventId, availableEvents]);

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);

    if (!data.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email address is required to complete the registration.",
      });
      return;
    }

    let finalEventTitle = eventTitle;
    let finalEventPrice = eventPrice;
    let finalEventLocation = eventLocation;
    let finalEventDate = eventDate;
    let finalEventTime = eventTime;

    if (data.selectedEventId && availableEvents.length > 0) {
      const selectedEvent = availableEvents.find(e => e.id.toString() === data.selectedEventId);
      if (selectedEvent) {
        finalEventTitle = selectedEvent.title;
        finalEventPrice = selectedEvent.price;
        finalEventLocation = selectedEvent.location;
        finalEventDate = selectedEvent.date;
        finalEventTime = selectedEvent.time;
      }
    }

    const bookingDetails = `
Booking Details:
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || "Not provided"}
Attendees: ${data.attendeeCount}
Preferred Date: ${format(data.selectedDate, "PPP")}
Dietary Requirements: ${data.dietaryRequirements || "None"}
Questions: ${data.questions || "None"}
Marketing Consent: ${data.marketingConsent ? "Yes" : "No"}

Event Details:
Title: ${finalEventTitle || "No specific event selected"}
Price: ${finalEventPrice || "N/A"}
Location: ${finalEventLocation || "N/A"}
Date: ${finalEventDate || "N/A"}
Time: ${finalEventTime || "N/A"}
    `;

    try {
      await sendSupportEmail(data.fullName, data.email, bookingDetails, finalEventTitle || "General", finalEventLocation || "N/A");
      await sendConfirmationEmail(data.email, data.fullName, finalEventLocation || "N/A", finalEventTitle || "General");

      toast({
        title: "Registration complete!",
        description: "Your booking request has been received. We'll contact you shortly to confirm your reservation.",
      });

      onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem submitting your booking request. Please try again.",
      });
    }
  };

  const getAvailableDates = (date?: string) => {
    const mayFirst2025 = new Date(2025, 4, 1); // May 1st, 2025
    const eventDateObj = date ? new Date(date) : new Date(2025, 4, 15); // Default to May 15th, 2025
    const endDate = new Date(2025, 11, 31); // December 31st, 2025

    return {
      from: mayFirst2025,
      to: endDate,
    };
  };

  const getCurrentEvent = () => {
    if (eventTitle) {
      return { title: eventTitle, location: eventLocation, date: eventDate, time: eventTime, price: eventPrice };
    }

    if (selectedEventId) {
      const selectedEvent = availableEvents.find(e => e.id.toString() === selectedEventId);
      if (selectedEvent) {
        return { title: selectedEvent.title, location: selectedEvent.location, date: selectedEvent.date, time: selectedEvent.time, price: selectedEvent.price };
      }
    }

    return null;
  };

  const currentEvent = getCurrentEvent();
  const availableDates = getAvailableDates(currentEvent?.date);

  return (
    <div className="space-y-6">
      {!eventTitle && availableEvents.length > 0 && (
        <FormField
          control={form.control}
          name="selectedEventId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Event*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-dark-lighter border-dark-lighter z-50">
                  {availableEvents.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.title} - {event.date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {currentEvent && (
        <div className="bg-dark-lighter p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">{currentEvent.title}</h3>
          <div className="text-white/70 text-sm">
            <p>Location: {currentEvent.location}</p>
            <p>Date: {currentEvent.date}</p>
            <p>Time: {currentEvent.time}</p>
            <p className="text-gold font-semibold mt-2">{currentEvent.price} per person</p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Full name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" className="text-black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" className="text-black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number*</FormLabel>
                <FormControl>
                  <Input placeholder="Your contact number" className="text-black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          {/* Company and Attendee count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="company" render={({ field }) => (
              <FormItem>
                <FormLabel>Company/Organization</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name (optional)" className="text-black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="attendeeCount" render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Attendees*</FormLabel>
                <FormControl>
                  <Input type="number" min="1" placeholder="1" className="text-black" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          {/* Date selection */}
          <FormField control={form.control} name="selectedDate" render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Preferred Date*</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-full text-left font-normal", !field.value && "text-muted-foreground", field.value && "text-black")}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Select an available date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-dark-light border-dark-lighter z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < availableDates.from || date > availableDates.to || date.getDay() === 0}
                    defaultMonth={availableDates.from}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )} />

          {/* Dietary and questions */}
          <FormField control={form.control} name="dietaryRequirements" render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Requirements</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please let us know about any dietary requirements or allergies"
                  className="resize-none text-black"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="questions" render={({ field }) => (
            <FormItem>
              <FormLabel>Questions for Steven</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any specific topics or questions you'd like to discuss?"
                  className="resize-none text-black"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Marketing Consent */}
          <FormField control={form.control} name="marketingConsent" render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to receive marketing communications about future events
                </FormLabel>
              </div>
            </FormItem>
          )} />

          {/* Final Terms */}
          <div className="bg-dark-lighter p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <div className="text-sm text-white/70">
                <p>
                  By submitting this form, you're registering your interest in attending this event.
                  Our team will contact you to confirm your booking and arrange payment details.
                </p>
                <p className="mt-2">
                  For more information, please contact <a href="mailto:support@stevenbartlett.info" className="text-gold hover:underline">support@stevenbartlett.info</a>
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-gold hover:bg-gold-dark text-dark">
            Register Interest
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
