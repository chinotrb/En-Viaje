import { useEffect, useState } from "react";

export default function Countdown() {
  const [diasFaltantes, setDiasFaltantes] = useState(null);

  useEffect(() => {
    const fechaObjetivo = new Date("2026-03-30T00:00:00");

    function actualizarDias() {
      const ahora = new Date();
      const diferencia = fechaObjetivo - ahora;
      const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
      setDiasFaltantes(dias > 0 ? dias : 0);
    }

    actualizarDias();
    const interval = setInterval(actualizarDias, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return <span>{diasFaltantes}</span>;
}
