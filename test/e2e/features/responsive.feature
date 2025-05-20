Feature: Acceso en diferentes dispositivos
  Como usuario
  Quiero que la app funcione igual en móvil y en escritorio
  Para usarla desde donde quiera

  Scenario: Vista responsive en móvil
    Given que abro la app en un dispositivo móvil
    When navego al _dashboard_
    Then todos los menús y botones se adaptan a la pantalla pequeña
      And no hay barras de desplazamiento horizontales

  Scenario: Vista completa en escritorio
    Given que abro la app en un ordenador
    When navego al _dashboard_
    Then el menú lateral está siempre visible
      And el contenido ocupa todo el ancho disponible
