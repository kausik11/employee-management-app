
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger} from "./ui/sheet"
import './Navbar.css';
import { useSignIn, useUser, useClerk  } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



const Navbar: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const { signIn, isLoaded } = useSignIn();
  const { signOut } = useClerk ();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {

    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await user?.reload();
        navigate("/dashboard"); // Redirect on success
      } else {
        setError("Unexpected error. Please try again.");
      }
    } catch (err: any) {
      setError("Invalid credentials. Please check your email or password.");
      alert("Invalid credentials. Please check your email or password")
    }
  };

  const handleLogout = () => {
    signOut(()=>navigate("/"));
  };

  return (
    <Sheet>
    <SheetTrigger asChild>
      {!isSignedIn ? (
        <Button variant="outline">Admin Login</Button>
      ) : (
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </Button>
      )}
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{isSignedIn ? "Profile" : "Login to access"}</SheetTitle>
        <SheetDescription>
        {isSignedIn ? "Manage your account here." : "Enter your credentials to proceed."}
        </SheetDescription>
      </SheetHeader>

      
      {isSignedIn ? (
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label className="font-semibold">Email:</Label>
              <span>{user?.primaryEmailAddress?.emailAddress}</span>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                className="col-span-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                className="col-span-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" onClick={handleLogin}>
                  Login
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Navbar
