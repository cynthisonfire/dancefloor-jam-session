import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const anonymousFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender.",
  }),
});

const AuthPage = () => {
  const navigate = useNavigate();
  const [showAnonymousForm, setShowAnonymousForm] = useState(false);

  const form = useForm<z.infer<typeof anonymousFormSchema>>({
    resolver: zodResolver(anonymousFormSchema),
    defaultValues: {
      username: "",
      gender: undefined,
    },
  });

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    // Check if there's an anonymous user in localStorage
    const anonymousUser = localStorage.getItem('anonymousUser');
    if (anonymousUser) {
      navigate('/');
    }
  }, [navigate]);

  const onAnonymousSubmit = async (values: z.infer<typeof anonymousFormSchema>) => {
    try {
      const { data, error } = await supabase
        .from('anonymous_users')
        .insert([
          { username: values.username, gender: values.gender }
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        // Store anonymous user data in localStorage
        localStorage.setItem('anonymousUser', JSON.stringify(data));
        toast.success("Welcome to DanceFloor!");
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (showAnonymousForm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dancefloor p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Join Anonymously</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAnonymousSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a temporary username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Male
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Female
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Other
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <Button type="submit" className="w-full">
                  Continue
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowAnonymousForm(false)}
                >
                  Back to Login
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dancefloor p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to DanceFloor</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#2D1B69',
                  brandAccent: '#FF00FF',
                }
              }
            }
          }}
          providers={[]}
        />
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowAnonymousForm(true)}
          >
            Continue Anonymously
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;