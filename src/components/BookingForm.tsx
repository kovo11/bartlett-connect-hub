
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      attendeeCount: "1",
      dietaryRequirements: "",
      questions: "",
      marketingConsent: false,
      selectedEventId: eventId?.toString() || "",
    },
  });

  // Generate available dates (for demonstration, using dates around the event date)
  const getAvailableDates = (date?: string) => {
    const today = new Date();
    const eventDateObj = date ? new Date(date) : new Date();
    const startDate = new Date();
    startDate.setDate(Math.max(today.getDate(), eventDateObj.getDate() - 7));
    const endDate = new Date(eventDateObj);
    endDate.setDate(eventDateObj.getDate() + 7);
    
    return {
      from: startDate,
      to: endDate,
    };
  };

  // If event is selected from dropdown, update form
  React.useEffect(() => {
    const selectedEventId = form.watch("selectedEventId");
    if (selectedEventId && availableEvents.length > 0) {
      const selectedEvent = availableEvents.find(e => e.id.toString() === selectedEventId);
      if (selectedEvent) {
        // No need to set values here, we'll just use the selected event for display
        form.setValue("selectedDate", new Date());
      }
    }
  }, [form.watch("selectedEventId"), availableEvents]);

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    
    // Determine which event details to use
    let finalEventTitle = eventTitle;
    let finalEventPrice = eventPrice;
    let finalEventLocation = eventLocation;
    let finalEventDate = eventDate;
    let finalEventTime = eventTime;

    // If the user selected an event from dropdown
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
    
    try {
      // Email content construction
      const emailSubject = `New Registration for ${finalEventTitle || 'Upcoming Event'}`;
      const emailBody = `
        New registration for ${finalEventTitle || 'Upcoming Event'}:
        
        Name: ${data.fullName}
        Email: ${data.email}
        Phone: ${data.phone}
        Company: ${data.company || "Not provided"}
        Number of Attendees: ${data.attendeeCount}
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
      
      // Email sending via mailto (client-side approach)
      const mailtoLink = `mailto:support@stevenbartlett.info?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink);
      
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

  // Get the current event to display
  const getCurrentEvent = () => {
    if (eventTitle) {
      return {
        title: eventTitle,
        location: eventLocation,
        date: eventDate,
        time: eventTime,
        price: eventPrice
      };
    }
    
    const selectedEventId = form.watch("selectedEventId");
    if (selectedEventId) {
      const selectedEvent = availableEvents.find(e => e.id.toString() === selectedEventId);
      if (selectedEvent) {
        return {
          title: selectedEvent.title,
          location: selectedEvent.location,
          date: selectedEvent.date,
          time: selectedEvent.time,
          price: selectedEvent.price
        };
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
                <SelectContent className="bg-dark-lighter border-dark-lighter">
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
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address*</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number*</FormLabel>
                  <FormControl>
                    <Input placeholder="Your contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company/Organization</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attendeeCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Attendees*</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="selectedDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Preferred Date*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select an available date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-dark-light border-dark-lighter" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        return (
                          date < availableDates.from ||
                          date > availableDates.to ||
                          // Disable weekends for example
                          date.getDay() === 0
                        );
                      }}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dietaryRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dietary Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please let us know about any dietary requirements or allergies"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="questions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Questions for Steven</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any specific topics or questions you'd like to discuss?"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="marketingConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to receive marketing communications about future events
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

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
