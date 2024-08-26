import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> => {
  const RequiresAuthentication: ComponentType<P> = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/educator");
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return RequiresAuthentication;
};

export default withAuth;
