import { Card } from "@/components/ui/card";
import Image from "next/image";
import CreditIcon from "../../public/qc-coin.png"; // Icono para los créditos
import StatusIcon from "../../public/status-icon.png"; // Icono para el estatus
import AchievementIcon from "../../public/holo-red.png"; // Icono para los logros
import { BellIcon, Contact, BookMarked, Book } from "lucide-react";

export default function Profile() {
  const userData = {
    username: "Anónimo", // TODO: Obtener el usuario real
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
    recentActivity: [
      "Publicó un nuevo proyecto",
      "Comentó en la propuesta de otro usuario",
      "Recibió un nuevo logro",
    ],
    notifications: [
      "Mencionaron tu nombre en un comentario",
      "Tienes 2 nuevas solicitudes de amistad",
    ],
    friends: ["Usuario1", "Usuario2", "Usuario3"],
    interests: ["Tecnología", "Innovación", "Ciberseguridad"],
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
            <Image
              src={CreditIcon}
              alt="Quantum Credits"
              width={30}
              height={30}
            />{" "}
            Créditos Cuánticos
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

        {/* Actividad Reciente */}
        <Card className="p-4 col-span-2">
          <h2 className="text-lg font-bold mb-2">Actividad Reciente</h2>
          <ul className="list-disc pl-5">
            {userData.recentActivity.map((activity, index) => (
              <li key={index} className="text-gray-700">
                {activity}
              </li>
            ))}
          </ul>
        </Card>

        {/* Notificaciones */}
        <Card className="p-4 col-span-2 bg-blue-100">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <BellIcon size={25} /> Notificaciones
          </h2>
          <ul className="list-disc pl-5">
            {userData.notifications.map((notification, index) => (
              <li key={index} className="text-gray-700">
                {notification}
              </li>
            ))}
          </ul>
        </Card>

        {/* Amigos */}
        <Card className="p-4 col-span-2">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Contact size={25} /> Amigos
          </h2>
          <ul className="list-disc pl-5">
            {userData.friends.map((friend, index) => (
              <li key={index} className="text-gray-700">
                {friend}
              </li>
            ))}
          </ul>
        </Card>

        {/* Intereses */}
        <Card className="p-4 col-span-2">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <BookMarked size={25} /> Intereses
          </h2>
          <ul className="list-disc pl-5">
            {userData.interests.map((interest, index) => (
              <li key={index} className="text-gray-700">
                {interest}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
