import { Link } from "react-router-dom"; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold dark:text-white">
        Employee Management App
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 my-4 md:my-0">
        © {new Date().getFullYear()} Kausik Saha. All rights reserved.
        </div>

      
      </div>

    </footer>
  );
};




export default Footer
