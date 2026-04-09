import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

const UserProfile = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 text-white shadow-lg md:px-6 md:py-4">
      <div className="flex-1" />
      <nav className="flex items-center gap-4">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className='rounded-full border border-white px-4 py-1.5 text-sm transition hover:bg-white hover:text-black md:px-5 md:text-base'>
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className='rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:bg-black hover:text-white hover:shadow-[0_0_0_1px_white_inset] md:px-5 md:text-base'>
              Sign Up
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </nav>
    </header>
  )
}

export default UserProfile
