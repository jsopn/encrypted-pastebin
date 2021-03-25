import NavButton from './NavButton'

export default function Header () {
  return (
    <nav className="flex justify-around container p-4 mx-auto">
      <NavButton href="/">
        Create paste
      </NavButton>

      <h1>
        Encrypted pastebin
      </h1>

      <NavButton href="/view">
        View paste
      </NavButton>
    </nav>
  )
}
