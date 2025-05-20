Feature: Registro y autenticación de usuario
  Como usuario
  Quiero poder crear una cuenta e iniciar sesión
  Para acceder a las funcionalidades de la plataforma

  Scenario: Registro exitoso de un nuevo usuario
    Given que estoy en la página de registro
    When ingreso nombre de usuario "juan"
      And ingreso correo "juan@mail.com"
      And ingreso contraseña "Secreto123!"
      And confirmo la contraseña "Secreto123!"
    Then veo el mensaje "Registro exitoso"
      And mi cuenta queda creada en el sistema

  Scenario: Inicio de sesión con credenciales válidas
    Given que estoy en la página de inicio de sesión
    When ingreso correo "juan@mail.com"
      And ingreso contraseña "Secreto123!"
      And hago clic en "Iniciar sesión"
    Then soy redirigido al _dashboard_
      And veo un saludo “¡Bienvenido, juan!”

  Scenario: Inicio de sesión con credenciales inválidas
    Given que estoy en la página de inicio de sesión
    When ingreso correo "juan@mail.com"
      And ingreso contraseña "WrongPass"
      And hago clic en "Iniciar sesión"
    Then sigo en la página de login
      And veo el error "Correo o contraseña incorrectos"
