import { SignInForm } from '@/components/auth/sign-in-form';

export default function SignInPage() {
  return <div
      className="
        min-h-screen w-full
        bg-gradient-to-br from-[#eaf6ff] via-[#ffeedd] to-[#ffd9a0]
        bg-[length:200%_200%] animate-gradient-slow
        backdrop-blur-xl bg-white/30
        border border-white/20
        flex items-center justify-center
      "
    >
    <SignInForm />
    </div> ;
}
