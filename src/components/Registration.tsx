
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendConfirmationEmail, initEmailJS } from "@/utils/emailUtils";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  location: z.string().min(1, { message: "Please select a location" }),
  eventType: z.string().min(1, { message: "Please select an event type" }),
});

type FormValues = z.infer<typeof formSchema>;

const Registration = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize email service when component mounts
    initEmailJS();
  }, []);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      eventType: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    
    try {
      // Send confirmation email using the email service
      await sendConfirmationEmail(data.email, data.name, data.location, data.eventType);
      
      toast({
        title: "Registration successful!",
        description: "Your registration has been submitted. We'll be in touch soon.",
        duration: 5000,
      });
      
      form.reset();
    } catch (error) {
      console.error("Error processing submission:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <section id="register" className="section-padding relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Register Your <span className="gold-gradient">Interest</span>
              </h2>
              <p className="text-white/80 mb-6">
                Limited spots are available for our exclusive events. Register your interest now to be 
                notified when new events are announced or when spots become available.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-gold/20 p-2 rounded-full">
                    <svg className="h-5 w-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white/90">First access to event tickets</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="bg-gold/20 p-2 rounded-full">
                    <svg className="h-5 w-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white/90">Exclusive early bird discounts</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="bg-gold/20 p-2 rounded-full">
                    <svg className="h-5 w-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white/90">Special VIP event invitations</p>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-light p-8 rounded-xl shadow-lg border border-dark-lighter reveal">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field}
                            className="bg-dark border-dark-lighter focus:border-gold"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Your email" 
                            {...field}
                            className="bg-dark border-dark-lighter focus:border-gold"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-dark border-dark-lighter focus:border-gold">
                              <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-dark-light">
                            <SelectItem value="london">London</SelectItem>
                            <SelectItem value="manchester">Manchester</SelectItem>
                            <SelectItem value="newyork">New York</SelectItem>
                            <SelectItem value="losangeles">Los Angeles</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
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
                        <FormLabel>Event Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-dark border-dark-lighter focus:border-gold">
                              <SelectValue placeholder="Select an event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-dark-light">
                            <SelectItem value="meetgreet">Meet & Greet</SelectItem>
                            <SelectItem value="dinner">VIP Dinner</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="qa">Q&A Session</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gold hover:bg-gold-dark text-dark font-medium"
                  >
                    Register Interest
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
