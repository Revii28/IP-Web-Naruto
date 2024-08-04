import PropTypes from "prop-types";

const PageSize = ({ sizes, onSelectSize }) => {
  return (
    <div className="btn-group">
      {sizes.map((size) => (
        <button
          key={size}
          className="btn btn-outline-secondary"
          onClick={() => onSelectSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

PageSize.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  onSelectSize: PropTypes.func.isRequired,
};

export default PageSize;
