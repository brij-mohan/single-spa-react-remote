import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Common/Header";
import ShowUserList from "./components/User/ShowUserList";
import CreateUser from "./components/User/CreateUser";
import EditUser from "./components/User/EditUser";
import { getData, state$ } from "@app/utility";
import { useEffect } from "react";

export default function Root(props) {
  // get data from shared utility
  useEffect(() => {
    getData('/data').then((data) => {
      console.log('get react api', data);
    }).catch((err) => {
      console.log('Error while getting data from utility api in react', err);
    });

    const subscription = state$.subscribe((data) => {
      console.log('get react subject', data);
    }).catch((err) => {
      console.log('Error while getting data from subject', err);
    });

    state$.next({ name: "Set react shared data in subject"});
    sessionStorage.setItem("utility_react", "React App Data");
    console.log("react storage ", localStorage.getItem("utility_react"));

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  return (
    <>
    <section>
      {props.name} is mounted!
      <a href="/">Go to Angular remote app!</a>
      </section>
    <BrowserRouter>
      <Header />
          <Routes>
            <Route path="/react" element={<ShowUserList />}></Route>
            <Route path="/react/create-user" element={<CreateUser />}></Route>
            <Route path="/react/edit-user/:id" element={<EditUser />}></Route>
          </Routes>
    </BrowserRouter>
  </>
  );
}
