import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm} from "react-hook-form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select,SelectTrigger,SelectValue,SelectContent,SelectItem } from "./ui/select"
import { useReducer } from "react"
import { format } from "date-fns";
import emailjs from "@emailjs/browser"; 
import Swal from "sweetalert2";




const employeeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional().refine((val) => !val || /^[0-9]{10,15}$/.test(val), "Phone number must be 10-15 digits"),
  role: z.enum(["Developer", "Designer", "Manager"], { required_error: "Role is required" }),
  joiningDate: z.string().refine((date) => new Date(date) <= new Date(), "Joining date cannot be in the future"),
});


// Form Data Type
type EmployeeFormValues = z.infer<typeof employeeSchema>;

const employeeReducer = (state:EmployeeFormValues[],action:{type:string; payload?:EmployeeFormValues})=>{
  switch (action.type) {
    case "ADD_EMPLOYEE":{
      const newState = [...state, action.payload!];
      localStorage.setItem("employees", JSON.stringify(newState));
      return newState;
    }
    default:
      return state
  }
}

const RegForm:React.FC = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormValues>({ resolver: zodResolver(employeeSchema) });
 

  const [employees, dispatch] = useReducer(employeeReducer, [], () => {
    const storedEmployees = localStorage.getItem("employees");
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });

  const onSubmit = (data: EmployeeFormValues) => {
    dispatch({ type: "ADD_EMPLOYEE", payload: data });

    const templateParams = {
      name: data.name,
      email: data.email,
      phone: data.phone || "N/A",
      role: data.role,
      joiningDate: data.joiningDate,
    };
    emailjs
      .send("service_g6zdigq", "template_i1t0kah", templateParams, "3WkkGJ5vR2P5nGB9Q")
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          Swal.fire({
            title: "Success!",
            text: "Employee details have been saved and email sent successfully!",
            icon: "success",
            confirmButtonText: "OK",
          })
        },
        (error) => {
          console.error("Failed to send email:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to send email. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          })
        }
      );
    reset();
  };

  

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Employee Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Name" {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <Input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <Input type="text" placeholder="Phone (Optional)" {...register("phone")} />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

        <Select onValueChange={(value) => setValue("role", value as "Developer" | "Designer" | "Manager", { shouldValidate: true }) }>
          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Developer">Developer</SelectItem>
            <SelectItem value="Designer">Designer</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}

        <Input
          type="date"
          {...register("joiningDate")}
          max={format(new Date(), "yyyy-MM-dd")}
        />
        {errors.joiningDate && <p className="text-red-500 text-sm">{errors.joiningDate.message}</p>}

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
   
  )
}

export default RegForm
