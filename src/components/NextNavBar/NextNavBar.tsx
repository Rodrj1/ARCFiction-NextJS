import NextLink from "../NextLink/NextLink";

const NextNavBar = () => {
  return (
    <>
      <nav>
        <NextLink href="/">
          <a>
            Home
          </a>
        </NextLink>
        <NextLink href="/searcher">
          <a>About</a>
        </NextLink>
      </nav>

      <style jsx>{`
        nav {
          display: flex;
          align-items: center;
          justify-content:center;
          height: 60px;
          width:100%;
          margin:auto;
          background: #571b986c;
          position: fixed;
          z-index: 100000;
        }
        nav a {
          margin: 0px 50px;
          text-decoration: none;
          font-size: 30px;
          color: inherit;
          border-bottom: 1px solid transparent;
          transition: 0.2s ease-in-out;
        }
        nav a:hover {
          border-bottom: 1px solid #fff;
        }
      `}</style>
    </>
  );
};

export default NextNavBar;
