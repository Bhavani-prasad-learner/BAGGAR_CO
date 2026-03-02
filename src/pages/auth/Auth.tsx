import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Facebook } from "lucide-react";
import Logo from "@/components/Logo";

const loginSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().min(10, "Phone number must be at least 10 characters").optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => data.email || data.phone, {
  message: "Either email or phone is required",
  path: ["email"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Auth = () => {
  const { user, loading, login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const navigate = useNavigate();
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.phone, values.password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const onSignupSubmit = async (values: SignupFormValues) => {
    try {
      await register(
        values.email || values.phone || '',
        values.password,
        undefined, // displayName (optional, handled in context)
        values.username,
        values.phone // Pass phone if present
      );
      setActiveTab("login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-restaurant-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black/80">
      {/* Cross button at top right with transition */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 ease-in-out"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="w-full max-w-md bg-[#1A1A1A] rounded-2xl p-6 shadow-lg">
        <div className="flex justify-center mb-6">
          {/* Add transition to logo/login icon if it's clickable */}
         
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button 
              onClick={() => setActiveTab("login")}
              className={`rounded-full ${activeTab === "login" 
                ? "bg-restaurant-primary text-white" 
                : "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"}`}
            >
              Login
            </Button>
            <Button 
              onClick={() => setActiveTab("signup")}
              className={`rounded-full ${activeTab === "signup" 
                ? "bg-restaurant-primary text-white" 
                : "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"}`}
            >
              Sign Up
            </Button>
          </div>

          {/* Login method switch */}
          <div className="grid grid-cols-2 gap-4 mb-8 border-b border-gray-800">
            <Button 
              variant="link" 
              onClick={() => setLoginMethod("email")}
              className={`pb-2 ${loginMethod === "email" 
                ? "text-restaurant-primary border-b-2 border-restaurant-primary" 
                : "text-gray-400"}`}
            >
              Email/Username
            </Button>
            <Button 
              variant="link" 
              onClick={() => setLoginMethod("phone")}
              className={`pb-2 ${loginMethod === "phone" 
                ? "text-restaurant-primary border-b-2 border-restaurant-primary" 
                : "text-gray-400"}`}
            >
              Phone Number
            </Button>
          </div>

          <TabsContent value="login" className="mt-0">
            <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-5">
                <FormField
                  control={loginForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder={loginMethod === "email" ? "Username or Email" : "Phone Number"}
                          type={loginMethod === "phone" ? "tel" : "text"}
                          className="bg-[#2A2A2A] border-none h-12 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            className="bg-[#2A2A2A] border-none h-12 text-white pr-10" 
                            {...field} 
                          />
                          <button 
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                      <div className="flex justify-end mt-1">
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-restaurant-primary"
                          type="button"
                        >
                          Forgot Password?
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90 text-white rounded-full h-12"
                  disabled={loginForm.formState.isSubmitting}
                >
                  {loginForm.formState.isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : "Login"}
                </Button>
                
                <div className="text-center text-gray-400 my-4">Or continue with</div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="bg-[#2A2A2A] border-gray-700 text-white hover:bg-[#3A3A3A] flex items-center justify-center gap-2"
                  >
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="bg-[#2A2A2A] border-gray-700 text-white hover:bg-[#3A3A3A] flex items-center justify-center gap-2"
                  >
                    <Facebook size={20} />
                    Facebook
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="signup" className="mt-0">
            <h2 className="text-2xl font-bold mb-6">Create Account</h2>
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-5">
                <FormField
                  control={signupForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Username" 
                          className="bg-[#2A2A2A] border-none h-12 text-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Only show email OR phone field based on loginMethod */}
                {loginMethod === "email" ? (
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            type="email"
                            className="bg-[#2A2A2A] border-none h-12 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={signupForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Phone Number"
                            type="tel"
                            className="bg-[#2A2A2A] border-none h-12 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            className="bg-[#2A2A2A] border-none h-12 text-white pr-10" 
                            {...field} 
                          />
                          <button 
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <div className="mt-1 text-xs text-red-500">
                        {field.value ? 'Password strength: Weak' : ''}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password" 
                            className="bg-[#2A2A2A] border-none h-12 text-white pr-10" 
                            {...field} 
                          />
                          <button 
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90 text-white rounded-full h-12"
                  disabled={signupForm.formState.isSubmitting}
                >
                  {signupForm.formState.isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : "Create Account"}
                </Button>
                
                <div className="text-center text-gray-400 my-4">Or sign up with</div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="bg-[#2A2A2A] border-gray-700 text-white hover:bg-[#3A3A3A] flex items-center justify-center gap-2"
                  >
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="bg-[#2A2A2A] border-gray-700 text-white hover:bg-[#3A3A3A] flex items-center justify-center gap-2"
                  >
                    <Facebook size={20} />
                    Facebook
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;

