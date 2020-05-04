import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Container } from "@material-ui/core";

export default function App() {


  const handlerSummit = (e) => {
    console.log(e);

  }

  const controls = [
    { name: 'name', label: 'Name' },
    { name: 'lastname', label: 'Last name' },
    {
      name: 'email',
      control: 'input',
      type: 'email',
      label: 'Email'
    }

  ]

  return (
    <Container maxWidth="md">
      <Home controls={controls} summit={handlerSummit} />
    </Container>

  );
}
