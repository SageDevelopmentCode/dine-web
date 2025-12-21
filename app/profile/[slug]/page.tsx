interface ProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
        <p className="text-xl">Slug: {slug}</p>
      </div>
    </div>
  );
}
