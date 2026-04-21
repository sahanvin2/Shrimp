import slugifyPkg from 'slugify';

export function slugify(value = '') {
  return slugifyPkg(value, { lower: true, strict: true, trim: true });
}
