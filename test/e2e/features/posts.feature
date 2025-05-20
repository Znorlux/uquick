Feature: Crear posts y votar en el foro
  Como usuario autenticado
  Quiero crear publicaciones en mis comunidades y votar en las de otros
  Para compartir contenido y participar

  Scenario: Crear un post en una comunidad
    Given que estoy en la página de la comunidad "Dev Colombia"
    When hago clic en "Nuevo post"
      And ingreso título "Cómo usar Next.js"
      And escribo contenido "Algunas buenas prácticas..."
      And publico el post
    Then veo el post con título "Cómo usar Next.js"
      And el contenido aparece debajo

  Scenario: Votar positivamente en un post
    Given que veo un post titulado "Cómo usar Next.js"
    When hago clic en el botón "Me gusta"
    Then el contador de votos sube en 1
