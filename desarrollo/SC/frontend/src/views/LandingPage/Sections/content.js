const businessData = {
  title: process.env.REACT_APP_BRAND || 'Tinkuy',
  description: 'Enfocados a brindarle la mejor experiencia a todos los turistas permitiéndoles aprovechar al máximo cada viaje. Los invitamos a conocer nuestro servicios ayudándoles a tomar la decisión correcta al momento de buscar y reservar hoteles, restaurantes y atracciones. Contarás con las mejores tarifas, opiniones y experiencias de otros usuarios.',
  subBusinessInfo: [{
    id: 'hotel',
    title: 'Hoteles',
    description: 'Encuentra los mejores precios de hoteles, cabañas y alojamientos ubicados en las distintas ciudades del país, lo cuales son ideales para el turismo de recreacion asi como para los negocios.',
    icon: 'hotel',
    iconColor: 'info'
  }, {
    id: 'restaurant',
    title: 'Restaurantes',
      description: 'La culinaria es uno de los mejores atractivos cuando viajamos por eso descubre la singularidad de nuestra cocina visitando los diferentes restaurantes que tenemos para ti.',
      icon: 'restaurant_menu',
    iconColor: 'danger'
  }, {
    id: 'travel_agency',
    title: 'Agencias de viaje',
    description: 'Nos aseguramos que tus viajes sean seguros y confiables, dispondrás de una variedad de empresas asociadas al turismo registradas en nuestra aplicación.',
    icon: 'map',
    iconColor: 'success'
  }]
}

const serviceData = {
  title: 'Descubre',
  servicesInfo: [{
    id: 'plan',
    title: 'Planifica tu viaje',
    description: 'Buscando y reservando hoteles, restaurantes y agencias de viajes, encontraras las mejores ofertas y serás partícipe de las actividades culturales más recientes de cada sitio turístico.',
    img: require('../../../assets/img/services/service1.jpg')
  }, {
      id: 'guide',
      title: 'Guia turistica',
      description: 'Tendrás acceso a un mapa para una mejor experiencia de viaje, lo cual le permitirá encontrar los diferentes lugares turísticos y compartir tu ubicación actual con tus amigos o familiares.',
      img: require('../../../assets/img/services/service2.jpg')
  }, {
      id: 'exp',
      title: 'Experiencias',
      description: 'Realizarás comentarios, puntuaciones y podrás leer las diferentes opiniones de distintos usuarios que ya tuvieron experiencia con el servicio de alojamiento, restaurantes o agencias de viajes.',
      img: require('../../../assets/img/services/service3.jpg')
  }]
}

const downloadData = {
  title: 'Descargar la aplicación',
  description: 'Encuentra la mejor forma de llegar a cualquier sitio desde tu móvil o tablet. No lo pienses mas, únete y se parte de esta gran red de viajeros.',
  stores: [{
    id: 'apple',
    to: 'https://www.apple.com/la/ios/app-store/',
    img: require('../../../assets/img/download/spanish/app-store.png')
  }, {
    id: 'google',
    to: 'https://play.google.com/store',
    img: require('../../../assets/img/download/spanish/google-play.png')
  }]
}
export {
  businessData,
  serviceData,
  downloadData
}
