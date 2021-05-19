export const BrandEmpty = () => ({
  id: -1,
  title: '',
  description: '',
  link: '',
  color: '',
  logo: '',
  origin: '',
  startDate: null,
  endDate: null,
});

export const BrandFromRequest = (body) => ({
  id: body.id,
  title: body.name,
  description: body.description,
  link: body.link,
  logo: body.logo,
  color: body.color,
  origin: body.origin,
  startDate: body.start,
  endDate: body.end,
});
