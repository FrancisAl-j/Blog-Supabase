const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="h-40 grid place-items-center border-t-2 border-[#eee]">
      <h1 className="text-[#eee]">
        © {year} Francis Al-j | All Rights Reserved
      </h1>
    </footer>
  );
};

export default Footer;
