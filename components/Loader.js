const Loader = (show) => {
  return show ? (
    <div className="loader--bkg">
      <div className="loader"></div>
    </div>
  ) : null;
};

export default Loader;
