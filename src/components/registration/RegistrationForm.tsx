
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { formSchema, FormValues } from "./types";

const RegistrationForm = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize EmailJS when component mounts
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
      // Show loading toast
      toast({
        title: "Submitting registration...",
        description: "Please wait while we process your registration.",
        duration: 3000,
      });
      
      // Send confirmation email using EmailJS
      await sendConfirmationEmail(data.email, data.name, data.location, data.eventType);
      
      // Success toast
      toast({
        title: "Registration successful!",
        description: "Your registration has been submitted. We'll be in touch soon.",
        duration: 5000,
      });
      
      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error processing submission:", error);
      
      // Error toast
      toast({
        title: "Something went wrong",
        description: "We couldn't process your registration. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
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
  );
};

export default RegistrationForm;
