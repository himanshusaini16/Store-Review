import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const StoresPage = () => {
  const { backendUrl, token } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [avgRatings, setAvgRatings] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q")?.toLowerCase() || "";

  const AllStores = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/all-stores`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setStores(data.data);
      } else {
        //console.log(data.message);
        alert(data.message);
      }
    } catch (error) {
      //console.log(error);
      alert("Error!!");
    }
  };

  const averageRating = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/avg-ratings`);
      if (data.success) {
        setAvgRatings(data.data);
      } else {
        //console.log("Error block");
        alert("Error!!");
      }
    } catch (error) {
      //console.log(error);
      alert("Error!!");
    }
  };

  const getStoreRating = (storeId) => {
    const ratingObj = avgRatings.find((r) => r.store_id === storeId);
    return ratingObj ? ratingObj.avg_rating : null;
  };

  useEffect(() => {
    AllStores();
    averageRating();
  }, []);

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(query) ||
      (store.address && store.address.toLowerCase().includes(query))
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Browse Stores</h1>

      {query && (
        <p className="text-center text-gray-600 mb-6">
          Showing results for <span className="font-semibold">"{query}"</span>
        </p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => {
            const avg = getStoreRating(store.id);
            return (
              <div
                key={store.id}
                onClick={() => navigate(`/stores/${store.id}`)}
                className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
              >
                <img
                  src={
                    store.image ||
                    "https://img.freepik.com/free-vector/shop-with-sign-we-are-open_52683-38687.jpg"
                  }
                  alt={store.name}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-1">{store.name}</h2>
                  <p className="text-gray-500 text-sm mb-2">
                    {store.address || "No address available"}
                  </p>
                  <p className="text-gray-700 mb-2">
                    {store.description || "No description available"}
                  </p>
                  <p className="text-yellow-600 font-semibold">
                    ⭐ Overall: {avg ? avg : "No ratings yet"}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No stores found.
          </p>
        )}
      </div>
    </div>
  );
};

export default StoresPage;
