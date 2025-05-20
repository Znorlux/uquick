Feature: Inscripción de wallet y recompensas
  Como usuario activo
  Quiero linkear mi wallet y recibir recompensas por mi participación
  Para gestionarlas en mi cuenta

  Scenario: Inscribir wallet exitosamente
    Given que estoy autenticado
      And voy a "Configuración > Wallet"
    When ingreso dirección de wallet "0xABC123..."
      And confirmo la inscripción
    Then veo "Wallet conectada: 0xABC123..."
      And la opción de ver saldo de recompensas

  Scenario: Recompensar participación tras votar
    Given que he votado en un post
      And mi wallet está inscrita
    When finaliza el proceso de validación
    Then recibo notificación "Has ganado 5 puntos"
      And mi saldo de recompensas aumenta en 5
