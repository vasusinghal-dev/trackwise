export default function ProfileHeader() {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Profile Settings
          </h1>
          <p className="text-text-secondary mt-2">
            Manage your personal information, preferences, and security
          </p>
        </div>
      </div>
    </div>
  );
}
