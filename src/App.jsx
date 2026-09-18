import { RouterProvider } from "react-router-dom";
import { ComplaintProvider } from "./context/ComplaintContext";
import { AnnouncementProvider } from "./context/AnnouncementContext";
import { BookingProvider } from "./context/BookingContext";
import router from "./Pages/Router";

function App() {
  return (
    <ComplaintProvider>
      <AnnouncementProvider>
        <BookingProvider>
          <RouterProvider router={router} />
        </BookingProvider>
      </AnnouncementProvider>
    </ComplaintProvider>
  );
}

export default App;
