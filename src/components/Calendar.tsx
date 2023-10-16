import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import axios from "axios";
import { useEffect, useState } from "react";
import { EventCalendar } from "react-mui-event-calendar";
import { useSelector } from "react-redux";
import { selectAuthentication } from "../slices/auth";
type Event = {
  id?: string;
  title: string;
  popupContent: ReactJSXElement;
  date: Date;
  color?: string;
};
type EventsData = Array<Event>;

function App() {
  const authentication = useSelector(selectAuthentication);
  const token = authentication.accessToken;
  const [dataSource, setDataSource] = useState<EventsData>([]);
  const handleDeleteEvent = async (id: string) => {
    try {
      axios
        .delete(`${process.env.PUBLIC_URL}/appointment/${id}`)
        .then(() => Fetchevents());
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };
  const Fetchevents = async () => {
    axios
      .get(`${process.env.PUBLIC_URL}/appointment/myappointment`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDataSource([
          ...response.data,
          {
            id: response.data.id,
            title: response.data.title,
            date: response.data.date,
            color: response.data.color,
          },
        ]);
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
      });
  };
  useEffect(() => {
    // Fetch events data from an API or perform any initialization here
    Fetchevents();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "3em 0",
      }}
    >
      <EventCalendar dataSource={dataSource} readonly={true} />
    </div>
  );
}

export default App;
