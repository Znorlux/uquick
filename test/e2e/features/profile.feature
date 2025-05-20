Feature: Gestión de perfil de usuario
  Como usuario autenticado
  Quiero poder editar mi nombre de perfil
  Para mostrar mi identidad como yo prefiera

  Scenario: Editar nombre de perfil exitosamente
    Given que estoy autenticado como "juan"
      And estoy en la sección "Mi perfil"
    When hago clic en "Editar nombre"
      And cambio el nombre a "JuanTobon"
      And guardo los cambios
    Then veo el mensaje "Perfil actualizado"
      And el nombre de perfil muestra "JuanTobon"
