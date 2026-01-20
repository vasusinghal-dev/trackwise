import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        className="flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg hover:bg-surface transition-colors duration-200"
      >
        <FcGoogle className="w-5 h-5" />
        <span className="text-text-secondary">Google</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg hover:bg-surface transition-colors duration-200"
      >
        <FaGithub className="w-5 h-5" />
        <span className="text-text-secondary">GitHub</span>
      </button>
    </div>
  );
}
