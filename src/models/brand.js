export const BrandEmpty = () => ({
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
  title: body.name,
  description: body.description,
  link: body.link,
  logo: body.logo,
  color: body.color,
  origin: body.origin,
  startDate: body.start,
  endDate: body.end,
});
