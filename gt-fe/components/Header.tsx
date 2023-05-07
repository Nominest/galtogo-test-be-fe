interface HeaderProps {
  userEmail: string;
}

export default function Header({ userEmail }: HeaderProps) {
  return (
    <>
      <div className="flex justify-between px-4 pt-4">
        <h3>Admin Dashboard</h3>
        <h3>{userEmail ? `Welcome, ${userEmail}` : "Welcome"}</h3>
      </div>
    </>
  );
}
