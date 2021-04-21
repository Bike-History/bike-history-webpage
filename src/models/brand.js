export const BrandEmpty = () => ({
  name: '',
  description: '',
  link: '',
  color: '',
  logo: '',
  start: null,
  end: null,
});

export const BrandFromRequest = (body) => ({
  name: body.name,
  description: body.description,
  link: body.link,
  logo: body.logo,
  color: body.color,
  start: body.start,
  end: body.end,
});
