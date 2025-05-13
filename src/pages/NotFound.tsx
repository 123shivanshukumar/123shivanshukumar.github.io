
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="page-container flex flex-col items-center justify-center py-20">
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Page not found</p>
        <p className="text-center max-w-md mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
