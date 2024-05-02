// pages/educator/settings.tsx
import { useState } from "react";
import Link from "next/link";
import withAuth from "@/components/WithAuth/withAuth";

const Settings = () => {
  // State for storing user settings
  const [profileImageUrl, setProfileImageUrl] = useState("");

  return (
    <div>
      <Link href="/educator">Back to Dashboard</Link>
      <h1>Profile Settings</h1>
    </div>
  );
};

export default withAuth(Settings);
