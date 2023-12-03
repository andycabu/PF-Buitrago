import PropTypes from "prop-types";
import { useTheme } from "../hooks/useTheme";

function DayNight({ position }) {
  const { theme, changeTheme } = useTheme();

  return (
    <label className={`day-night z-10 ${position}`}>
      <input
        onChange={changeTheme}
        type="checkbox"
        checked={theme === "dark"}
      />
      <div></div>
    </label>
  );
}

DayNight.propTypes = {
  position: PropTypes.string,
};

export default DayNight;
