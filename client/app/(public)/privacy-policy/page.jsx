export const metadata = {
  title: 'Privacy Policy',
  description: 'Read the Shrimp Privacy Policy.',
  robots: { index: true, follow: false },
  alternates: { canonical: 'https://shrimp.app/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p><time dateTime="2026-04-21">Last updated April 21, 2026</time></p>
      <h2>Data Collected</h2>
      <p>Shrimp collects account, usage, and device data to operate the service.</p>
      <h2>How Used</h2>
      <p>We use data to deliver videos, recommendations, and account functionality.</p>
    </article>
  );
}
