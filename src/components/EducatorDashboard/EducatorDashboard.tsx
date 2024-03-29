import Link from "next/link";

type EducatorDashboardProps = {
  signOutUser: () => Promise<void>;
};

const EducatorDashboard = ({ signOutUser }: EducatorDashboardProps) => {
  return (
    <div>
      <h1>Educator Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link href="/educator/uploads">Uploads</Link>
          </li>
          <li>
            <Link href="/educator/settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <button onClick={signOutUser}>Sign Out</button>
    </div>
  );
};

export default EducatorDashboard;
