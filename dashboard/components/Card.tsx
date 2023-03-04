import { cx } from "classix";

type CardProps = JSX.IntrinsicElements["div"] & {
    /**
     * Whether the card should have a hover effect.
     */
    hover?: boolean;
};

/**
 * Card component (styles a div to have a border and rounded corners). Can have a hover effect.
 */
export const Card = ({ hover = false, className, children, ...props }: CardProps) => (
    <div
        className={cx(
            className,
            "bg-gray-900 p-6 rounded-xl transition-all duration-200",
            hover && "hover:shadow-lg hover:cursor-pointer hover:border-white"
        )}
        {...props}
    >
        {children}
    </div>
);
