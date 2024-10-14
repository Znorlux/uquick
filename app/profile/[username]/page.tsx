import { Card } from "@/components/ui/card";
import Image from "next/image";
//import CreditIcon from "../../../public/credit-icon.png"; // Icono para los créditos
import StatusIcon from "../../../public/status-icon.png"; // Icono para el estatus
import AchievementIcon from "../../../public/holo-red.png"; // Icono para los logros
import { Separator } from "@/components/ui/separator";

export default function Profile({ params }: { params: { username: string } }) {
  const userData = {
    username: params.username || "Anónimo",
    cyberStatus: "Ciberexplorador",
    quantumCredits: 1250,
    holoAchievements: [
      "Maestro del Intercambio",
      "Arquitecto de Ideas",
      "Visión Futurista",
    ],
    advancementModules: [
      "Primer Proyecto en HoloRed",
      "20 Propuestas Validadas",
      "Recompensa de Innovador",
    ],
    stats: {
      posts: 48,
      comments: 102,
      impactScore: 540,
      influenceRating: 95,
    },
    innovationPoints: 500,
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-6">
        Perfil de <span className="text-primary">{userData.username}</span>
      </h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Estatus Cibernético */}
        <Card className="col-span-2 flex items-center p-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white">
          <Image src={StatusIcon} alt="Status" width={50} height={50} />
          <div className="ml-4">
            <h2 className="text-xl font-bold">{userData.cyberStatus}</h2>
            <p>¡Sigue contribuyendo para alcanzar nuevos niveles de estatus!</p>
          </div>
        </Card>

        {/* Créditos Cuánticos */}
        <Card className="p-4">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <QCIcon /> Créditos Cuánticos
          </h2>
          <p className="text-blue-600 text-2xl font-bold">
            {userData.quantumCredits} QCs
          </p>
          <p className="text-sm text-gray-600">
            ¡Utiliza tus créditos para desbloquear beneficios exclusivos!
          </p>
        </Card>

        {/* Logros de HoloRed */}
        <Card className="p-4">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Image
              src={AchievementIcon}
              alt="Achievements"
              width={30}
              height={30}
            />{" "}
            Logros de HoloRed
          </h2>
          <ul className="list-disc pl-5">
            {userData.holoAchievements.map((achievement, index) => (
              <li key={index} className="text-purple-600">
                {achievement}
              </li>
            ))}
          </ul>
        </Card>

        {/* Módulos de Avance */}
        <Card className="p-4 col-span-2">
          <h2 className="text-lg font-bold mb-2">
            Módulos de Avance Alcanzados
          </h2>
          <ul className="list-disc pl-5">
            {userData.advancementModules.map((module, index) => (
              <li key={index} className="text-green-600">
                {module}
              </li>
            ))}
          </ul>
        </Card>

        {/* Estadísticas de Impacto Digital */}
        <Card className="p-4 col-span-2">
          <h2 className="text-lg font-bold mb-2">
            Estadísticas de Impacto Digital
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                Posts:{" "}
                <span className="font-bold text-blue-600">
                  {userData.stats.posts}
                </span>
              </p>
              <p>
                Comentarios:{" "}
                <span className="font-bold text-blue-600">
                  {userData.stats.comments}
                </span>
              </p>
            </div>
            <div>
              <p>
                Puntuación de Impacto:{" "}
                <span className="font-bold text-blue-600">
                  {userData.stats.impactScore}
                </span>
              </p>
              <p>
                Clasificación de Influencia:{" "}
                <span className="font-bold text-blue-600">
                  {userData.stats.influenceRating}
                </span>
              </p>
            </div>
          </div>
        </Card>

        {/* Puntos de Innovación */}
        <Card className="p-4 col-span-2 bg-yellow-100">
          <h2 className="text-lg font-bold">Puntos de Innovación</h2>
          <p className="text-yellow-600 text-2xl font-bold">
            {userData.innovationPoints} puntos
          </p>
          <p className="text-sm text-gray-600">
            ¡Usa tus puntos para desbloquear innovaciones y mejoras en la
            plataforma!
          </p>
        </Card>
      </div>
    </div>
  );
}

const QCIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={30}
    height={30}
    color={"#000000"}
    fill={"none"}
  >
    <path
      d="M14 18C18.4183 18 22 14.4183 22 10C22 5.58172 18.4183 2 14 2C9.58172 2 6 5.58172 6 10C6 14.4183 9.58172 18 14 18Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3.1004 11C2.4033 12.1065 2 13.4168 2 14.8212C2 18.7859 5.21417 22 9.17905 22C10.5834 22 11.8935 21.5968 13 20.8998"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 10H15.5M12 10V6.5H14M12 10V13.5H14M15.5 10C16.3284 10 17 9.2165 17 8.25C17 7.2835 16.3284 6.5 15.5 6.5H14M15.5 10C16.3284 10 17 10.7835 17 11.75C17 12.7165 16.3284 13.5 15.5 13.5H14M14 13.5V14.5M14 6.5V5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
