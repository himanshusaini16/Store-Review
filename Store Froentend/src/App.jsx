import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";

import AuthForm from "./Pages/Login";
import StoresPage from "./Pages/StorePage";
import StoreDashboard from "./Pages/StooreDashboard";
import StoreRatingsPage from "./Pages/StoreRatingsPage";
import AdminDashboard from "./Pages/AdminDashboard";
import Profile from "./Pages/Profile";
import AddUserForm from "./Pages/Addnewuser";
import AddStore from "./Pages/AddStore";
import AllStores from "./Pages/AllStores";
import Alluser from "./Pages/Alluser";
import Store from "./Pages/Store";
import ProtectedRoute from "./Pages/ProtectedRoute";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/stores"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <StoresPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/stores/:storeid"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Store />
              </ProtectedRoute>
            }
          />

          <Route
            path="/store-dashboard"
            element={
              <ProtectedRoute allowedRoles={["store"]}>
                <StoreDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/store-ratings"
            element={
              <ProtectedRoute allowedRoles={["store"]}>
                <StoreRatingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-stores"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AllStores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Alluser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["user", "store", "admin"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-user"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddUserForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-store"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddStore />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
