// components/withAuth.tsx
import { useRouter } from "next/router";
import React, { ComponentType, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext"; // Adjust the path as needed to point to your AuthContext

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> => {
  const RequiresAuthentication: ComponentType<P> = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/educator"); // Redirect to login if not authenticated
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return null; // Or loading spinner, etc.
    }

    return <WrappedComponent {...props} />;
  };

  return RequiresAuthentication;
};

export default withAuth;
