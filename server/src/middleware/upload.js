import multer from 'multer';

export const upload = multer({
  dest: '/tmp/uploads',
  limits: { fileSize: 500 * 1024 * 1024 },
});
