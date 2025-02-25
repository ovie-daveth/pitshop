import ProtectedRoute from "@/api/protected/ProtectedRoute";

export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <div>
          <h1>About</h1>
          <p>This is the about page</p>
        </div>
      </ProtectedRoute>
    </>
  );
}
