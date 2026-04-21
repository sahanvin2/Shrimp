import { VideoUploader } from '../../../components/video/VideoUploader';

export const metadata = { robots: { index: false, follow: false } };

export default function UploadPage() {
  return <section className="space-y-4"><h1 className="text-3xl font-bold">Upload</h1><VideoUploader /></section>;
}
