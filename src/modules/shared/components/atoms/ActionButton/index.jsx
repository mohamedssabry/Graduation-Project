import React from "react";
import PropTypes from "prop-types";

const ActionButton = ({ label, iconSrc, onClick, classNames = "py-2" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-blue-500 text-white rounded-lg px-4 w-full text-2xl flex justify-center gap-2 cursor-pointer ${classNames}`}
    >
      {label}
      {iconSrc && <img src={iconSrc} alt={`${label} icon`} width={25} />}
    </button>
  );
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  classNames: PropTypes.string,
};

export default ActionButton;
