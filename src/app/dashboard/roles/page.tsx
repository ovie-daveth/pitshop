import ProtectedRoute from "@/api/protected/ProtectedRoute";
import WrapperLayout from "@/components/WrapperLayout";
export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <WrapperLayout>
          <div>
            <h1>Roles</h1>
            <p>This is a Roles page</p>
          </div>
        </WrapperLayout>
      </ProtectedRoute>
    </>
  );
}
