import PropTypes from "prop-types";

const PaginationButton = ({ onClick, text, disabled }) => {
  return (
    <button
      className="btn btn-primary me-2"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

PaginationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default PaginationButton;
