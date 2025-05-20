Feature: Crear y editar una comunidad
  Como usuario autenticado
  Quiero crear una comunidad y luego poder modificar su descripción
  Para organizar temas de interés

  Scenario: Crear una comunidad nueva
    Given que estoy autenticado
      And estoy en la página "Crear comunidad"
    When ingreso nombre "Dev Colombia"
      And escribo descripción "Comunidad de desarrolladores colombianos"
      And hago clic en "Crear"
    Then soy redirigido a la página de la comunidad "Dev Colombia"
      And veo la descripción "Comunidad de desarrolladores colombianos"

  Scenario: Editar la descripción de mi comunidad
    Given que soy el moderador de "Dev Colombia"
      And estoy en la página de la comunidad
    When hago clic en "Editar descripción"
      And cambio la descripción a "Foro de desarrolladores Full-Stack"
      And guardo los cambios
    Then veo el mensaje "Descripción actualizada"
      And la descripción muestra "Foro de desarrolladores Full-Stack"
