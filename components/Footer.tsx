import Container from "./Container";

const Footer = () => {
  const gitHubUrl = "https://github.com/oshanQQ";
  const gitHubUserName = "oshanQQ";

  return (
    <footer>
      <Container>
        <div className="py-10 flex flex-col items-center text-center">
          <h3 className="text-lg tracking-tighter leading-tight text-center text-[#6C6C6C]">
            ©{new Date().getFullYear()} <a href={gitHubUrl}>{gitHubUserName}</a>
          </h3>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
