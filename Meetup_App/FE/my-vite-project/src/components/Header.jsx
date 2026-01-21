const Header = ({ setSearchText }) => {
  return (
    <>
      <nav className="navbar bg-light border-bottom px-4 py-3">
        <div className="container-fluid">
          <h3
            style={{
              fontFamily: "Pacifico",
              color: "#ff5a5f",
              margin: 0,
            }}
          >
            Meetup
          </h3>

          <input
            type="search"
            className="form-control w-25"
            placeholder="search by title, tags"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </nav>
    </>
  );
};

export default Header;
