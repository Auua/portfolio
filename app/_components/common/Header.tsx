type HeaderProps = {
  title: string;
  children?: any;

};
const Header = ({ title, children }: HeaderProps) => (
  <header className={'main__header'} id={''}>
    <h1>{title}</h1>
    {children}
  </header>
);
export default Header;
