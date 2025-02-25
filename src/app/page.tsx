import ProtectedRoute from "@/api/protected/ProtectedRoute";

export default function Home() {
  return (
    <div>
      <main>
        <ProtectedRoute>
          <h1>Hello Pitstop</h1>
        </ProtectedRoute>
      </main>
    </div>
  );
}
