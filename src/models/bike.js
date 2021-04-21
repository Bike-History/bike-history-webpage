export const BikeEmpty = () => ({
  name: '',
  description: '',
  productionStart: null,
  productionEnd: null,
  bikeType: null,
  slug: '',
  link: '',
  images: [],
  contributors: [],
});

export const BikeFromRequest = (body) => ({
  name: body.name,
  description: body.description,
  productionStart: body.productionStart,
  productionEnd: body.productionEnd,
  bikeType: body.bikeType,
  slug: body.slug,
  images: body.images,
  link: body.link,
  contributors: body.contributors,
});
