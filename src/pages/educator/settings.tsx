// pages/educator/settings.tsx
import { useState } from "react";
import Link from "next/link";
import withAuth from "@/components/WithAuth/withAuth";

const Settings = () => {
  // State for storing user settings
  const [profileImageUrl, setProfileImageUrl] = useState("");

  return (
    <div>
      <h1>Profile Settings</h1>
      <Link href="/educator">Back to Dashboard</Link>
    </div>
  );
};

export default withAuth(Settings);
