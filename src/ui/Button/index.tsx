import React, { FC } from "react";
import { RotatingLines } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import PT from "prop-types";

import styles from "./Button.module.scss";

const propTypes = {
  children: PT.oneOfType([PT.string, PT.element]),
  // TODO find how to add TS Type to prop types
  // eslint-disable-next-line react/forbid-prop-types
  icon: PT.any,
  iconSize: PT.number,
  iconRight: PT.bool,
  className: PT.string,
  submit: PT.bool,
  size: PT.oneOf(["minimal", "small", "default"]),
  variant: PT.oneOf(["filled", "outlined", "text"]),
  href: PT.oneOfType([PT.string, PT.object]),
  title: PT.string,
  loading: PT.bool,
  onClick: PT.func,
  disabled: PT.bool,
};

type Props = PT.InferProps<typeof propTypes>;

const Button: FC<Props> = ({
  children,
  icon,
  iconSize,
  iconRight,
  className,
  submit,
  href,
  variant,
  size,
  title,
  disabled,
  loading,
  onClick,
  ...props
}): JSX.Element => {
  if (href) {
    return (
      <NavLink
        to={href}
        className={classnames(styles.btn, className, {
          [styles[`btn-variant--${variant}`]]: variant,
          [styles[`btn-size--${size}`]]: size,
        })}
      >
        {children || (
          <>
            {icon && !iconRight && (
              <FontAwesomeIcon
                icon={icon}
                style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  marginRight: `${title ? "6px" : 0}`,
                }}
              />
            )}
            <span>{title}</span>
            {iconRight && icon && (
              <FontAwesomeIcon
                icon={icon}
                style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  marginLeft: `${title ? "6px" : 0}`,
                }}
              />
            )}
          </>
        )}
      </NavLink>
    );
  }
  return (
    <button
      className={classnames(styles.btn, className, {
        [styles[`btn-variant--${variant}`]]: variant,
        [styles[`btn-size--${size}`]]: size,
      })}
      type={submit ? "submit" : "button"}
      onClick={onClick || (() => null)}
      disabled={disabled ?? false}
      {...props}
    >
      {children || (
        <>
          {loading ? (
            <RotatingLines
              strokeColor="#f6f7f7"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible
            />
          ) : (
            icon &&
            !iconRight && (
              <FontAwesomeIcon
                icon={icon}
                style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  marginRight: `${title ? "6px" : 0}`,
                }}
              />
            )
          )}
          <span>{title}</span>
          {iconRight && icon && (
            <FontAwesomeIcon
              icon={icon}
              style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                marginLeft: `${title ? "6px" : 0}`,
              }}
            />
          )}
        </>
      )}
    </button>
  );
};

Button.propTypes = propTypes;
export default Button;
