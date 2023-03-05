"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { cx } from "classix";
import { forwardRef } from "react";
import { MdExpandMore } from "react-icons/md";

interface CustomAccordionProps {
    items: {
        name: string;
        content: React.ReactNode;
    }[];
}

export const CustomAccordion = ({ items }: CustomAccordionProps) => {
    return (
        <Accordion.Root className="shadow rounded-md" type="multiple">
            {items.map((item, index) => (
                <AccordionItem key={index + item.name} value={item.name}>
                    <AccordionTrigger>{item.name}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion.Root>
    );
};

const AccordionItem = forwardRef<HTMLDivElement, Accordion.AccordionItemProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Item
            className={cx(
                className,
                "mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b"
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </Accordion.Item>
    )
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<HTMLButtonElement, Accordion.AccordionTriggerProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Header className="font-normal flex">
            <Accordion.Trigger
                className={cx(
                    className,
                    "text-white rounded-lg transition hover:bg-gray-800 group flex h-[45px] flex-1 cursor-pointer items-center justify-between bg-gray-900 p-4 py-6 text-[15px] leading-none outline-none"
                )}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <MdExpandMore
                    className={`self-center transition duration-300 group-data-[state=open]:rotate-180`}
                />
            </Accordion.Trigger>
        </Accordion.Header>
    )
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<HTMLDivElement, Accordion.AccordionContentProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Content
            className={cx(
                className,
                "text-white data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]"
            )}
            {...props}
            ref={forwardedRef}
        >
            <div className="py-2">{children}</div>
        </Accordion.Content>
    )
);
AccordionContent.displayName = "AccordionContent";
