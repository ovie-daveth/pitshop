// import ProtectedRoute from "@/api/protected/ProtectedRoute";
import Signin from "@/app/signin/page";

export default function Home() {
  return (
    <div>
      <main>
        <Signin />
        {/* <ProtectedRoute>
          <h1>Hello Pitstop</h1>
        </ProtectedRoute> */}
      </main>
    </div>
  );
}
        