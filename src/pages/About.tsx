import { useEffect } from "react";
import Team from "../components/Team";
import AcercaDe from "../components/AcercaDe";

export default function About() {
    useEffect(() => {
        // titulo de la pestaña del navegador
        document.title = "Acerca de - UNAH COPAN";
      }, []);
      
    return (
        <>
            <AcercaDe/>
            <Team/>
        </>
    )
}