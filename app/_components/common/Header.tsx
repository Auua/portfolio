const Header = ({ title, children }: { title: string; children?: any }) => (
  <header className={'main__header'} id={''}>
    <h1>{title}</h1>
    {children}
  </header>
);
export default Header;
